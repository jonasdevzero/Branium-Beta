import { useState } from "react"
import Image from "next/image"
import { useAppDispatch, useAppSelector, useWarn } from "~/hooks"
import { contactService } from "~/services/api"
import socket from "~/services/socket"
import { ContactInvitation } from "~/types/user"
import UserActions from "~/store/actions/user"

import { Avatar } from "~/components"
import { 
  InviteOption, 
  InviteOptions, 
  NoInvites, 
  User, 
  Users ,
} from "~/styles/components/Sidebar/Plus"
import { 
  FiCheck, 
  FiSearch, 
  FiX,
} from "react-icons/fi"

interface ContactInvitesI {
  setOption: React.Dispatch<React.SetStateAction<"search" | "invites" | "create_group">>
}

export default function ContactInvites({ setOption }: ContactInvitesI) {
  const invites = useAppSelector(state => state.user.contact_invitations);
  const [loadingId, setLoadingId] = useState<string>();

  const dispatch = useAppDispatch();
  const warn = useWarn();

  function acceptInvite(invite: ContactInvitation) {
    setLoadingId(invite.id);

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
    setLoadingId(invite.id);
    
    contactService.refuseInvite(invite.id)
      .then(() => {
        dispatch(UserActions.removeData("contact_invitations", { id: invite.id }))
        warn.success(`O Convite de ${invite.sender.username} foi recusado!`)
      })
      .catch(() => { })
      .then(() => setLoadingId(undefined))
  }

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