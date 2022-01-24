import { useState } from 'react';
import Image from "next/image";
import { groupService } from '~/services/api';
import { useAppDispatch, useAppSelector, useWarn } from '~/hooks';
import { Contact } from '~/types/user';
import UserActions from "~/store/actions/user"

import { Avatar } from '~/components';
import {
  Container,
  UploadLabel,
  ImagePreview,
  InputWrapper,
  Label,
  Input,
  TextArea,
  Submit,
  MembersContainer,
  Addmember,
  Members,
  Member,
  SelectContacts,
  Contacts,
} from '~/styles/components/Sidebar/Plus/CreateGroup';
import {
  FiUpload,
  FiX,
  FiPlus,
  FiCheck
} from 'react-icons/fi';

export default function CreateGroup() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState<File>();
  const [picturePreview, setPicturePreview] = useState('');
  const [members, setMembers] = useState<Contact[]>([]);

  const [loading, setLoading] = useState(false);

  const contacts = useAppSelector(state => state.user.contacts);
  const [selectContacts, setSelectContacts] = useState(false);

  const dispatch = useAppDispatch();
  const warn = useWarn();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    picture ? formData.append('picture', picture) : null;

    members.forEach(m => formData.append('memerbs', m.id))

    groupService.create(formData)
      .then(group => {
        dispatch(UserActions.pushData("groups", { data: group }))
        warn.success("Grupo criado com sucesso!")
      })
      .catch((error: string) => warn.error(error))
      .then(() => setLoading(false))
  }

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setPicture(file);

    setPicturePreview(URL.createObjectURL(file));
  }

  function removePicture() {
    setPicture(undefined);
    setPicturePreview('');
  }

  function toggleMember(member: Contact) {
    !!members.find(m => m.id === member.id) ?
      removeMember(member.id) : setMembers([...members, member])
  }

  function removeMember(member_id: string) {
    setMembers(members.filter(m => m.id !== member_id))
  }

  return (
    !selectContacts ? (
      <Container onSubmit={handleSubmit}>
        <div className="row">
          {!picture ? (
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
              <Label htmlFor="name">nome</Label>
              <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor="description">descrição</Label>
              <TextArea id="description" value={description} onChange={e => setDescription(e.target.value)} />
            </InputWrapper>
          </div>
        </div>

        <Submit type="submit">
          {loading ? (
            <Image src="/images/loading-light.svg" alt="loading" width="25" height="25" />
          ) : "Criar"}
        </Submit>

        <MembersContainer>
          <h4>Membros</h4>

          <Members>
            <Addmember onClick={() => setSelectContacts(true)}>
              <FiPlus />
            </Addmember>

            {members.map(m => (
              <Member key={m.id}>
                <Avatar src={m.picture} size="4rem" />
                <h5>{m.username}</h5>

                <span className="remove" onClick={() => removeMember(m.id)}>
                  <FiX />
                </span>
              </Member>
            ))}
          </Members>
        </MembersContainer>
      </Container >
    ) : (
      <SelectContacts>
        <span className='finish' onClick={() => setSelectContacts(false)}>
          <FiCheck />
        </span>

        <Contacts>
          {contacts.map(c => (
            <div className='contact' key={c.id} onClick={() => toggleMember(c)}>
              <Avatar src={c.picture} size='4.5rem' />
              <h5>{c.username}</h5>

              <span className='radio'>
                {!!members.find(m => m.id === c.id) ? (
                  <span className="selected"></span>
                ) : null}
              </span>
            </div>
          ))}
        </Contacts>
      </SelectContacts>
    )
  );
}
