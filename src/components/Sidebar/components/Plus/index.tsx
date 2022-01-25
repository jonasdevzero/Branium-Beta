import { useState } from "react"
import { useAppSelector } from "~/hooks"

import { SearchUsers, ContactInvites, CreateGroup } from './components'
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
} from "~/styles/components/Sidebar/Plus"
import {
  FiSearch,
  FiMail,
  FiUsers,
  FiX,
} from "react-icons/fi"

type PlusProps = {
  close: () => void
}

export default function Plus({ close }: PlusProps) {
  const invitesLength = useAppSelector(state => state.user.contact_invitations?.length)
  const [option, setOption] = useState<"search" | "invites" | "create_group">(invitesLength ? "invites" : "search")

  const titles = {
    search: "Pesquisar Usuários",
    invites: "Convites Recebidos",
    create_group: "Criar Grupo",
  }
  const components = {
    search: SearchUsers(),
    invites: <ContactInvites setOption={setOption} />,
    create_group: CreateGroup({ close }),
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

            {invitesLength ? (
              <OptionPending>{invitesLength > 9 ? "9+" : invitesLength}</OptionPending>
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
            <h3>{titles[option]}</h3>

            <Close onClick={close}>
              <FiX />
            </Close>
          </Header>

          <Content>{components[option]}</Content>
        </Inner>
      </Container>
    </>
  )
}
