import { Group } from "~/types/user";

import { Avatar } from "~/components";
import {
  Container,
} from "~/styles/components/Room/Group/Members";
import { useCallback } from "react";

interface MembersI {
  group: Group;
}

export default function Members({ group }: MembersI) {

  // const renderMembers = useCallback(() => {
  //   console.log("render users...", group.users)
  //   return 
  // }, [group, group.users.length])

  return (
    <Container>
      {group.users?.map((u) => (
        <div key={u.id}>
          <Avatar src={u.picture} size="4rem" />
          <span>{u.username}</span>
        </div>
      ))}
    </Container>
  )
}