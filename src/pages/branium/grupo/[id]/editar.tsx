import React, { useEffect, useState } from "react"
import Head from "next/head"
import Router from "next/router"
import Fuse from "fuse.js"
import { useAppDispatch, useAppSelector, useWarn } from "~/hooks"
import { groupService } from "~/services/api"
import UserActions from "~/store/actions/UserActions"
import { constant } from "~/constant"
import { Group, GroupUser } from "~/types/user"

import { Avatar, Sidebar } from "~/components"
import { Container, Inner } from "~/styles/pages/branium"
import {
  Content,
  Form,
  UploadLabel,
  ImagePreview,
  InputWrapper,
  Label,
  Input,
  Textarea,
  Submit,
  Hr,
  Members,
  MembersHeader,
  MembersInner,
  Member,
  MemberActions,
} from "~/styles/pages/branium/grupo/editar"
import { FiUpload, FiX, FiMoreHorizontal } from "react-icons/fi"

export default function Editar() {
  const user_id = useAppSelector(state => state.user.id)
  const [group, setGroup] = useState<Group>()
  const groups = useAppSelector(state => state.user.groups)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [picturePreview, setPicturePreview] = useState("")

  const [showActionsBtn, setShowActionsBtn] = useState("")
  const [showActions, setShowActions] = useState(false)

  const [filteredMembers, setFilteredMembers] = useState<GroupUser[] | undefined>(undefined)

  const [loading, setLoading] = useState(false)

  const warn = useWarn()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const group_id = Router.query.id as string;

    if (group_id) {
      const group = groups.find(g => g.id === group_id);

      if (group) {
        if (group.role === 0) {
          setGroup(group)
          setName(group.name)
          setDescription(group.description)
          setPicturePreview(group.picture)
        } else Router.replace(constant.routes.chat.GROUP(group_id))
      } else Router.replace(constant.routes.chat.HOME);
    }
  }, [groups])

  useEffect(() => {
    if (group) {
      if (!group.users.find(u => u.id === user_id)) {
        groupService.users.index(group.id).then(users => {
          dispatch(UserActions.updateRoom({
            field: "groups",
            where: { id: group.id },
            set: { users }
          }))
        })
      }
    }
  }, [group])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading || !group?.id) return;
    setLoading(true);

    groupService.update({ group_id: group.id, name, description })
      .then(() => warn.success("Grupo atualizado com sucesso!"))
      .catch(warn.error)
  }

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !group?.id) return;

    const file = e.target.files[0];
    setPicturePreview(URL.createObjectURL(file))

    groupService.update_picture(group.id, file)
      .then(picture => {
        setPicturePreview(picture)
        warn.success("Foto de grupo atualizado!")
      })
      .catch(warn.error)
  }

  function removePicture() {
    groupService.update_picture(group?.id || "", "")
      .then(() => {
        setPicturePreview("")
        warn.success("Foto de grupo removido!")
      })
      .catch(warn.error)
  }

  function searchMember(e: React.ChangeEvent<HTMLInputElement>) {
    if (!group) return;

    const query = e.target.value;
    const fuse = new Fuse(group.users, { keys: ['username'] })
    query.length ? setFilteredMembers(fuse.search(query).map(({ item }) => item))
      : setFilteredMembers(undefined);
  }

  function addMember(member_id: string) {

  }

  function promoteMember(member_id: string) {

  }

  function removeMember(member_id: string) {

  }

  return (
    <Container>
      <Head>
        <title>Branium | Editar Grupo</title>
      </Head>

      <Sidebar />

      <Inner>
        {group ? (
          <Content>
            <Form onSubmit={handleSubmit}>
              <h2>Dados do grupo</h2>

              <div className="row">
                {!group?.picture ? (
                  <>
                    <UploadLabel htmlFor="picture">
                      <FiUpload />
                    </UploadLabel>

                    <input id="picture" type="file" hidden onChange={handlePicture} />
                  </>
                ) : (
                  <ImagePreview>
                    <img src={picturePreview} />

                    <span className="remove" onClick={removePicture}>
                      <FiX />
                    </span>
                  </ImagePreview>
                )}

                <div className="col">
                  <InputWrapper>
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                  </InputWrapper>

                  <InputWrapper>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
                  </InputWrapper>

                  <Submit>Atualizar</Submit>
                </div>
              </div>
            </Form>

            <Hr />

            <Members>
              <MembersHeader>
                <h2>Membros do grupo</h2>

                <input type="text" placeholder="Pesquise algum membro" className="search" onChange={searchMember} />

                <button>Adicionar membro</button>
              </MembersHeader>

              <MembersInner>
                {(filteredMembers || group.users).map(u => {
                  const role = ["adm", "membro"][u.role];

                  return (
                    <Member
                      key={u.id}
                      onMouseOver={() => !showActions ? setTimeout(() => setShowActionsBtn(u.id), 60) : null}
                      onMouseLeave={() => {
                        if (!showActions) {
                          setShowActions(false)
                          setShowActionsBtn("")
                        }
                      }}
                    >
                      <Avatar src={u.picture} size="5rem" />
                      <h3>{u.username}</h3>

                      <span className={`role ${role}`}>
                        {role}
                      </span>

                      <MemberActions
                        className={`${showActionsBtn !== u.id || user_id === u.id ? "hidden" : ""}`}
                        onMouseLeave={() => {
                          setShowActions(false)
                          setShowActionsBtn("")
                        }}
                      >
                        <button type="button" onClick={() => setShowActions(!showActions)}>
                          <FiMoreHorizontal />
                        </button>

                        {showActions ? (
                          <div className="actions__inner">
                            {u.role === 1 ? (
                              <span className="action" onClick={() => promoteMember(u.id)}>Promover a adm</span>
                            ) : null}

                            <span className="action danger" onClick={() => removeMember(u.id)}>Remover do grupo</span>
                          </div>
                        ) : null}
                      </MemberActions>
                    </Member>
                  )
                })}
              </MembersInner>
            </Members>
          </Content>
        ) : null}
      </Inner>
    </Container>
  )
}