import { useState } from "react";
import Head from "next/head";
import { authPage, useAppDispatch, useAppSelector, useWarn } from "~/hooks";
import { userService } from "~/services/api";
import UserActions from "~/store/actions/UserActions";

import { Sidebar } from "~/components";
import { Container, Inner } from "~/styles/pages/branium";
import {
  Content,
  Form,
  UploadLabel,
  ImagePreview,
  Label,
  Input,
  InputWrapper,
  Submit,
  UpdateEmailWrapper,
  EmailInput,
  EditEmail,
  Overlay,
  UpdateEmailForm,
} from "~/styles/pages/branium/conta";
import {
  FiUpload,
  FiX,
  FiEdit2,
} from "react-icons/fi";

export default function Conta() {
  const user = useAppSelector(state => state.user);

  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [picturePreview, setPicturePreview] = useState(user?.picture);

  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const warn = useWarn();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    userService.update({ name, username })
      .then(() => {
        dispatch(UserActions.updateUser({ name, username }))
        warn.success("Dados atualizados!");
      })
      .catch(error => warn.error(error))
      .then(() => setLoading(false));
  }

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setPicturePreview(URL.createObjectURL(file));

    userService.update_picture(file)
      .then((picture_url) => {
        dispatch(UserActions.updateUser({ picture: picture_url }))
        warn.success("Foto de perfil atualizado!");
      })
      .catch(error => warn.error(error))
  }

  function removePicture() {
    userService.update_picture("").then(() => {
      setPicturePreview("");
      dispatch(UserActions.updateUser({ picture: undefined }))
      warn.success("Foto de perfil atualizado!");
    })
      .catch(error => warn.error(error))
  }

  function handleEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    userService.update_email({ email: newEmail, password })
      .then((email) => {
        setShowUpdateEmail(false);
        setNewEmail("");
        setPassword("");

        dispatch(UserActions.updateUser({ email }))
        warn.success("Email atualizado com sucesso!");
      })
      .catch(error => warn.error(error));
  }

  function hiddenEmail(email: string) {
    const [name, domain] = email.split("@");

    const hidden = name
      .split("")
      .map((c, i) => i <= 2 ? c : undefined)
      .filter(l => !!l)
      .join("")

    return `${hidden}**********@${domain}`;
  }

  return (
    <Container>
      <Head>
        <title>Branium | Conta</title>
      </Head>

      <Sidebar />

      <Inner>
        <Content>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {!user?.picture ? (
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
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={username} onChange={e => setUsername(e.target.value)} />
                </InputWrapper>

                <Submit>Atualizar</Submit>
              </div>
            </div>

            <UpdateEmailWrapper>
              <Label htmlFor="email">Email</Label>

              <div className="wrapper">
                <EmailInput id="email" type="text" value={hiddenEmail(user.email)} disabled />

                <EditEmail type="button" onClick={() => setShowUpdateEmail(true)}>
                  <FiEdit2 />
                </EditEmail>
              </div>
            </UpdateEmailWrapper>
          </Form>
        </Content>
      </Inner>

      {showUpdateEmail ? (
        <>
          <Overlay onClick={() => setShowUpdateEmail(false)} />

          <UpdateEmailForm onSubmit={handleEmail}>
            <div>
              <h3>Trocar de email</h3>

              <span className="close" onClick={() => setShowUpdateEmail(false)}>
                <FiX />
              </span>
            </div>

            <InputWrapper>
              <Label htmlFor="email">Novo Email</Label>
              <Input id="email" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </InputWrapper>

            <button className="submit">
              Atualizar
            </button>
          </UpdateEmailForm>

        </>
      ) : null}
    </Container>
  )
}

export const getServerSideProps = authPage;
