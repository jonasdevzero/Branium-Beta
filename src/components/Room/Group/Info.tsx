import Router from "next/router"
import { constant } from "~/constant"
import { Group } from "~/types/user"

import { Avatar } from "~/components"
import {
  Container,
  Close,
  Edit,
  Name,
  MembersCount,
  DescriptionTitle,
  Description,
} from "~/styles/components/Room/Group/Info"
import { 
  FiX,
  FiEdit2,
} from "react-icons/fi"

type GroupInfoI = {
  group: Group
  close(): void
}
export default function Info({ group, close }: GroupInfoI) {
  return (
    <>
      <div className="overlay" onClick={close}></div>

      <Container>
        <Close onClick={close}>
          <FiX />
        </Close>

        <Edit onClick={() => Router.push(constant.routes.chat.EDIT_GROUP(group.id))}>
          <FiEdit2 />
        </Edit>

        <Avatar src={group.picture} size="15rem" />
        <Name>{group.name}</Name>

        <MembersCount>
          <span>
            {group.users.length} Membros
          </span>
        </MembersCount>

        <DescriptionTitle>Descrição</DescriptionTitle>
        <Description>{group.description}</Description>
      </Container>
    </>
  )
}