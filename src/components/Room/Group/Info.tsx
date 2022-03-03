import { useEffect } from "react"
import Router from "next/router"
import { useAppDispatch, useAppSelector } from "~/hooks"
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
import { groupService } from "~/services/api"
import UserActions from "~/store/actions/UserActions"

type GroupInfoI = {
  group: Group
  close(): void
}
export default function Info({ group, close }: GroupInfoI) {
  const user_id = useAppSelector(state => state.user.id)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!group.users.find(u => u.id === user_id)) {
      groupService.users.index(group.id).then(users => {
        dispatch(UserActions.updateRoom({
          field: "groups",
          where: { id: group.id },
          set: { users }
        }))
      })
    }
  }, [group])

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