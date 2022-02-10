import { useState, useCallback } from "react"
import Router from "next/router"
import Fuse from "fuse.js"
import { destroyCookie } from "nookies"
import { useAppSelector, useAppDispatch } from "~/hooks"
import socket from "~/services/socket"
import { constant } from "~/constant"
import SettingsActions from "~/store/actions/SettingsActions"
import { Contact, Group } from "~/types/user"

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
  const { user, config } = useAppSelector(state => ({ user: state.user, config: state.settings.sidebar }))

  const [searchContactResult, setSearchContactResult] = useState<Contact[]>()
  const [groupSearchResult, setSearchGroupResult] = useState<Group[]>()

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
      query.length ?
        setSearchContactResult(fuse.search(query).map(({ item }) => item)) : setSearchContactResult(undefined)
    } else {
      const fuse = new Fuse(user.groups, { keys: ["name"] })
      query.length ?
        setSearchGroupResult(fuse.search(query).map(({ item }) => item)) : setSearchGroupResult(undefined)
    }
  }, [config.currentOption, user.contacts])

  const renderContacts = useCallback(() => {
    return (searchContactResult || user.contacts.sort((a, b) => a.last_message_time > b.last_message_time ? -1 : 1))
      .map(contact => {
        return (
          <Room key={contact.id} onClick={() => Router.push(constant.routes.chat.CONTACT(contact.id))}>
            <Avatar src={contact.picture} size="5rem" />
            <h3>{contact.username}</h3>

            <Status className={contact.online ? "online" : "offline"} />
            {contact.unread_messages > 0 ? (<UnreadMessages>{contact.unread_messages}</UnreadMessages>) : null}
          </Room>
        )
      })
  }, [user.contacts, searchContactResult])

  const renderGroups = useCallback(() => {
    return (groupSearchResult || user.groups.sort((a, b) => a.last_message_time > b.last_message_time ? -1 : 1))
      .map((group) => (
        <Room key={group.id} onClick={() => Router.push(constant.routes.chat.GROUP(group.id))}>
          <Avatar src={group.picture} size="5rem" />
          <h3>{group.name}</h3>

          {group.unread_messages > 0 ? (<UnreadMessages>{group.unread_messages}</UnreadMessages>) : null}
        </Room>
      ))
  }, [user.groups, groupSearchResult])

  return (
    <>
      <Container>
        <Options>
          <User onClick={() => Router.push(constant.routes.chat.ACCOUNT)}>
            <Avatar user />
          </User>

          <OptionsInner>
            <Option onClick={() => dispatch(SettingsActions.sidebar.setOption("contacts"))}>
              <FiUser />
              <OptionSelected pending={!!pending.contacts} selected={config.currentOption === "contacts"} />
            </Option>

            <Option onClick={() => dispatch(SettingsActions.sidebar.setOption("groups"))}>
              <FiUsers />
              <OptionSelected pending={!!pending.groups} selected={config.currentOption === "groups"} />
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
                placeholder={`Encontre um ${config.currentOption === "contacts" ? "contato" : "grupo"}`}
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