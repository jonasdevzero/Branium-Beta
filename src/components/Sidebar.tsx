import { useState, useCallback } from "react"
import Router from "next/router"
import Fuse from "fuse.js"
import { destroyCookie } from "nookies"
import { useAppSelector, useAppDispatch } from "../hooks"
import socket from "../services/socket"
import { constants } from "../constants"
import { setOption } from "../store/actions/sidebar"

import { Avatar, AddContact } from "../components"
import Notifications from "./Notifications"

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
    PlusButton,
    PendingInvitations,
} from "../styles/components/Sidebar"

import {
    FiUser,
    FiUsers,
    FiPower,
    FiSearch,
    FiPlus,
    FiBell,
} from "react-icons/fi"

export default function Sidebar() {
    const { user, config } = useAppSelector(state => ({ user: state.user, config: state.sidebar }))
    const [contacts, setContacts] = useState(user.contacts)
    const pending = {
        contacts: user.contacts.reduce((acc, crr) => acc += crr.unread_messages, 0) + user.contact_invitations.length,
        groups: 0
    }

    const [showAddContact, setShowAddContact] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)

    const dispatch = useAppDispatch()

    function logout() {
        dispatch({ type: "RESET" })
        socket.disconnect()
        destroyCookie(undefined, "branium.jwt", { path: "/" })
        Router.push(constants.routes.HOME)
    }

    const search = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value

        if (config.currentOption === "contacts") {
            const fuse = new Fuse(user.contacts, { keys: ["username"] })
            query.length ? setContacts(fuse.search(query).map(({ item }) => item)) : setContacts(user.contacts)
        }
    }, [config.currentOption, user.contacts])

    function renderContacts() {
        return contacts.map(contact => (
            <Room key={contact.id} onClick={() => Router.push(constants.routes.chat.CONTACT(contact.id))}>
                <Avatar src={contact.picture} size="5rem" />
                <h3>{contact.username}</h3>

                <Status className={contact.online ? "online" : "offline"} />
                {contact.unread_messages > 0 ? (<UnreadMessages>{contact.unread_messages}</UnreadMessages>) : null}
            </Room>
        ))
    }

    function renderGroups() {
        return (
            <>
                <br />
                <h1>Em Desenvolvimento :)</h1>
            </>
        )
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

                    </OptionsInner>

                    <OptionsPlus>
                        <Option onClick={() => setShowNotifications(true)}>
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

                        <PlusButton onClick={() => setShowAddContact(true)}>
                            <FiPlus />

                            {user.contact_invitations.length ? (
                                <PendingInvitations>
                                    {user.contact_invitations.length > 9 ? "9+" : user.contact_invitations.length}
                                </PendingInvitations>
                            ) : null}
                        </PlusButton>
                    </RoomsContainer>
                </Inner>
            </Container>

            {showAddContact ? (<AddContact close={() => setShowAddContact(false)} />) : null}
            {showNotifications ? (<Notifications close={() => setShowNotifications(false)} />) : null}
        </>
    )
}