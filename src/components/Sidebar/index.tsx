import { useState, useCallback } from "react"
import Router from "next/router"
import Fuse from "fuse.js"
import { destroyCookie } from "nookies"
import { useAppSelector, useAppDispatch } from "~/hooks"
import socket from "~/services/socket"
import { constant } from "~/constant"
import { setOption } from "~/store/actions/sidebar"
import { Contact } from "~/types/user"

import { Avatar } from "../"
import { Plus, Notifications } from "./components"

import {
  Container,
  Options,
  User,
  OptionsInner,
  Option,
  OptionSelected,
  OptionsPlus,
  Inner,
  Header,
  HeaderTitle,
  HeaderPending,
  Search,
  SearchInputWrapper,
  SearchInput,
  SearchButton,
  RoomsContainer,
  Room,
  Status,
  UnreadMessages,
  PendingInvitations,
} from "~/styles/components/Sidebar"
import {
  FiSearch,
  FiUser,
  FiUsers,
  FiPlus,
  FiBell,
  FiPower,
} from "react-icons/fi"

export default function Sidebar() {
  const { user, config } = useAppSelector(state => ({ user: state.user, config: state.sidebar }))

  const [searchResult, setSearchResult] = useState<Contact[]>()
  const pending = {
    contacts: user.contacts.reduce((acc, crr) => acc += crr.unread_messages, 0),
    groups: user.groups.reduce((acc, crr) => acc += crr.unread_messages, 0),
    invitations: user.contact_invitations.length
  }

  const [showScreen, setShowScreen] = useState<"plus" | "notifications">()

  const dispatch = useAppDispatch()

  function logout() {
    dispatch({ type: "RESET" })
    socket.disconnect()
    destroyCookie(undefined, "branium.jwt", { path: "/" })
    Router.push(constant.routes.HOME)
  }

  const search = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    if (config.currentOption === "contacts") {
      const fuse = new Fuse(user.contacts, { keys: ["username"] })
      query.length ? setSearchResult(fuse.search(query).map(({ item }) => item)) : setSearchResult(undefined)
    }
  }, [config.currentOption, user.contacts])

  function renderContacts() {
    return (searchResult || user.contacts).map(contact => {
      return (
        <Room key={contact.id} onClick={() => Router.push(constant.routes.chat.CONTACT(contact.id))}>
          <Avatar src={contact.picture} size="5rem" />
          <h3>{contact.username}</h3>

          <Status className={contact.online ? "online" : "offline"} />
          {contact.unread_messages > 0 ? (<UnreadMessages>{contact.unread_messages}</UnreadMessages>) : null}
        </Room>
      )
    })
  }

  function renderGroups() {
    return user.groups.map((group) => (
      <Room key={group.id} onClick={() => Router.push(constant.routes.chat.GROUP(group.id))}>
        <Avatar src={group.picture} size="5rem" />
        <h3>{group.name}</h3>

        {group.unread_messages > 0 ? (<UnreadMessages>{group.unread_messages}</UnreadMessages>) : null}
      </Room>
    ))
  }

  return (
    <>
      <Container>
        <Options>
          <User onClick={() => { }}>
            <Avatar user />
          </User>

          <OptionsInner>
            <Option onClick={() => dispatch(setOption("contacts"))}>
              <FiUser />
              <OptionSelected selected={config.currentOption === "contacts"} />
            </Option>

            <Option onClick={() => dispatch(setOption("groups"))}>
              <FiUsers />
              <OptionSelected selected={config.currentOption === "groups"} />
            </Option>

            <Option onClick={() => setShowScreen("plus")}>
              <FiPlus />
              {pending.invitations ? (
                <PendingInvitations>
                  {pending.invitations > 9 ? "9+" : pending.invitations}
                </PendingInvitations>
              ) : null}
            </Option>
          </OptionsInner>

          <OptionsPlus>
            <Option onClick={() => setShowScreen("notifications")}>
              <FiBell />
            </Option>

            <Option onClick={() => logout()}>
              <FiPower />
            </Option>
          </OptionsPlus>
        </Options>

        <Inner>
          <Header>
            <HeaderTitle>{config.optionName}</HeaderTitle>

            {!!pending[config.currentOption] ? (
              <HeaderPending>{pending[config.currentOption]}</HeaderPending>
            ) : null}
          </Header>

          <Search>
            <SearchInputWrapper>
              <SearchInput
                type="text"
                placeholder={`Encontre um contato`}
                onChange={search}
              />

              <SearchButton type="button">
                <FiSearch />
              </SearchButton>
            </SearchInputWrapper>
          </Search>

          <RoomsContainer>
            {config.currentOption === "contacts" ? renderContacts() : renderGroups()}
          </RoomsContainer>
        </Inner>
      </Container>

      {function () {
        switch (showScreen) {
          case "plus":
            return (<Plus close={() => setShowScreen(undefined)} />)
          case "notifications":
            return (<Notifications close={() => setShowScreen(undefined)} />)
        }
      }()}
    </>
  )
}