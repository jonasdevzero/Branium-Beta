import { useState } from "react"
import Image from "next/image"
import { SearchUser, ContactInvitation } from "~/types/user"
import { useDebounce, useWarn, useAppSelector, useAppDispatch } from "~/hooks"
import { userService, contactService } from "~/services/api"
import UserActions from "~/store/actions/user"
import socket from "~/services/socket"

import CreateGroup from './components/CreateGroup'
import { Avatar } from "~/components"
import {
  Overlay,
  Container,
  Aside,
  OptionWrapper,
  Option,
  OptionSelected,
  OptionPending,
  Margin,
  Inner,
  Header,
  Close,
  Content,
  Search,
  SearchWrapper,
  SearchIcon,
  Users,
  User,
  InviteUser,
  InviteOptions,
  InviteOption,
  NoInvites,
} from "~/styles/components/Sidebar/Plus"
import {
  FiSearch,
  FiMail,
  FiUsers,
  FiX,
  FiCheck,
} from "react-icons/fi"

type PlusProps = {
  close: () => void
}

const title = {
  search: "Pesquisar Usuários",
  invites: "Convites Recebidos",
  create_group: "Criar Grupo",
}

export default function Plus({ close }: PlusProps) {
  const invites = useAppSelector(state => state.user.contact_invitations)
  const [option, setOption] = useState<"search" | "invites" | "create_group">(invites.length ? "invites" : "search")

  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState<SearchUser[]>([])
  const [loadingId, setLoadingId] = useState<string>()

  const warn = useWarn()
  const dispatch = useAppDispatch()

  const components = {
    search: renderSearch(),
    invites: renderInvites(),
    create_group: CreateGroup(),
  }

  useDebounce(() => {
    search.length && search.length > 2 ?
      userService.search(search)
        .then(users => setSearchResult(users))
        .catch(error => alert(error))
      : setSearchResult([])
  }, [search], 500)

  function inviteUser(user: SearchUser) {
    setLoadingId(user.id)
    contactService.invite(user.id)
      .then(() => {
        setSearchResult(searchResult.filter(u => u.id !== user.id))
        warn.success(`O convite foi enviado para ${user.username}`)
      })
      .catch((error: string) => warn.error(error))
      .then(() => setLoadingId(undefined))
  }

  function acceptInvite(invite: ContactInvitation) {
    setLoadingId(invite.id)
    contactService.acceptInvite(invite.id)
      .then(contact => socket.emit("is-online", contact.id, (isOnline: boolean) => {
        contact.online = isOnline
        contact.extra = {
          last_scroll_position: 0,
          pushed_messages: 0,
          fetch_messages_count: 0,
          full_loaded: false,
        }

        dispatch(UserActions.pushData("contacts", { data: contact }))
        dispatch(UserActions.removeData("contact_invitations", { id: invite.id }))
        warn.success(`O Convite de ${invite.sender.username} foi aceito!`)
      }))
      .catch((error: string) => warn.error(error))
      .then(() => setLoadingId(undefined))
  }

  function refuseInvite(invite: ContactInvitation) {
    setLoadingId(invite.id)
    contactService.refuseInvite(invite.id)
      .then(() => {
        dispatch(UserActions.removeData("contact_invitations", { id: invite.id }))
        warn.success(`O Convite de ${invite.sender.username} foi recusado!`)
      })
      .catch(() => { })
      .then(() => setLoadingId(undefined))
  }

  function renderSearch() {
    return (
      <>
        <SearchWrapper>
          <Search type="text" placeholder="Pesquise um usuário" value={search} onChange={e => setSearch(e.target.value)} />

          <SearchIcon onClick={() => setSearch("")}>
            {search.length ? (<FiX />) : (<FiSearch />)}
          </SearchIcon>
        </SearchWrapper>

        <Users>
          {searchResult?.map(u => (
            <User key={u.id}>
              <Avatar size="4.5rem" src={u.picture} />
              <h4>{u.username}</h4>

              <InviteUser onClick={() => inviteUser(u)}>
                {loadingId === u.id ? (
                  <Image src="/images/loading-light.svg" alt="loading" width="30" height="30" />
                ) : (<FiMail />)}
              </InviteUser>
            </User>
          ))}
        </Users>
      </>
    )
  }

  function renderInvites() {
    return invites.length ?
      (<Users>
        {invites.map(i => (
          <User key={i.id}>
            <Avatar size="4.5rem" src={i.sender.picture} />
            <h4>{i.sender.username}</h4>

            <InviteOptions>
              {loadingId === i.id ? (
                <Image src="/images/loading-light.svg" alt="loading" width="30" height="30" />
              ) : (
                <>
                  <InviteOption className="accept" onClick={() => acceptInvite(i)}>
                    <FiCheck />
                  </InviteOption>

                  <InviteOption className="refuse" onClick={() => refuseInvite(i)}>
                    <FiX />
                  </InviteOption>
                </>
              )}
            </InviteOptions>
          </User>
        ))}
      </Users>)
      : (
        <NoInvites>
          <h4>Nenhum convite pendente</h4>
          <h4>Pesquise por novos usuários</h4>

          <button onClick={() => setOption("search")}>
            <FiSearch />
          </button>
        </NoInvites>
      )
  }

  return (
    <>
      <Overlay onClick={close}></Overlay>

      <Container>
        <Aside>
          <Margin />
          <OptionWrapper>

            <Option onClick={() => setOption("search")}>
              <FiSearch />
            </Option>

            <OptionSelected selected={option === "search"} />
          </OptionWrapper>

          <Margin />
          <OptionWrapper>
            <Option onClick={() => setOption("invites")}>
              <FiMail />
            </Option>

            {invites?.length ? (
              <OptionPending>{invites.length > 9 ? "9+" : invites.length}</OptionPending>
            ) : null}

            <OptionSelected selected={option === "invites"} />
          </OptionWrapper>

          <Margin />
          <OptionWrapper>
            <Option onClick={() => setOption("create_group")}>
              <FiUsers />
            </Option>

            <OptionSelected selected={option === "create_group"} />
          </OptionWrapper>
        </Aside>

        <Inner>
          <Header>
            <h3>{title[option]}</h3>

            <Close onClick={close}>
              <FiX />
            </Close>
          </Header>

          <Content>
            {components[option]}
          </Content>
        </Inner>
      </Container>
    </>
  )
}
