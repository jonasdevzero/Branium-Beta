import { useCallback, useEffect, useMemo } from "react";
import { groupService } from "~/services/api";
import UserActions from "~/store/actions/UserActions";
import { useAppDispatch } from "~/hooks";
import { Group, GroupUser } from "~/types/user";

import { Avatar } from "~/components";
import {
  Container,
  Users,
  Member,
} from "~/styles/components/Room/Group/Members";
import socket from "~/services/socket";

interface MembersI {
  group: Group;
}

export default function Members({ group }: MembersI) {
  const [admins, users] = useMemo(() => {
    return group.users.reduce((acc, crr) => {
      acc[crr.role].push(crr);
      return acc;
    }, [[], []] as [GroupUser[], GroupUser[]])
  }, [group.users])

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!group.users.length) {
      groupService.users.index(group.id).then(users => {
        socket.emit("is-online", users.map(u => u.id), (usersOnline: [{ id: string, online: boolean }]) => {
          users = users.map(u => {
            u.online = usersOnline.find(uo => uo.id === u.id)!.online;
            return u;
          })

          dispatch(UserActions.updateRoom({
            field: "groups",
            where: { id: group.id },
            set: { users }
          }))
        })
      })
    }
  }, [group])

  const renderUsers = useCallback((gU: GroupUser[]) => {
    return gU.map((u) => (
      <Member key={u.id}>
        <Avatar src={u.picture} size="3.5rem" />

        <h5>{u.username}</h5>

        <span className={`status ${u.online ? "online" : "offline"}`}></span>
      </Member>
    ))
  }, [])

  return (
    <Container>
      {group.users.length ? (
        <>
          <Users>
            <h4>Admins -- {admins.length}</h4>
            {renderUsers(admins)}
          </Users>

          <Users>
            <h4>Membros -- {users.length}</h4>
            {renderUsers(users)}
          </Users>
        </>
      ) : null}
    </Container>
  )
}
