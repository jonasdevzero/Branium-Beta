import { useContext, useRef, useState } from "react";
import Router from "next/router";
import { useAppDispatch, useAppSelector, useOutsideClick, useWarn } from "~/hooks";
import { CallContext } from "~/contexts/CallContext";
import { groupService } from "~/services/api";
import SettingsActions from "~/store/actions/SettingsActions";
import UserActions from "~/store/actions/UserActions";
import { Group } from "~/types/user";
import { constant } from "~/constant";

import { Avatar } from "../../"

import {
  Container,
  Room,
  Icon,
  Dropdown,
  DropdownItem,
  ConfirmScreen,
} from "~/styles/components/Room/Header"
import {
  FiMoreVertical,
  FiPhone,
  FiVideo,
  FiUsers,
} from "react-icons/fi";

interface HeaderI {
  group: Group
  toggleInfo(): void
}

export default function Header({ group, toggleInfo }: HeaderI) {
  const { callTo } = useContext(CallContext);

  const userId = useAppSelector(state => state.user.id)
  const isAdm = useAppSelector(state => state.user.groups.find(g => g.id === group.id)?.role === 0)

  const dropdownRef = useRef(null)
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const dispatch = useAppDispatch();
  const warn = useWarn();

  useOutsideClick(dropdownRef, () => setShowDropdown(false))

  function leaveGroup() {
    groupService.leave(group.id).then(() => {
      dispatch(UserActions.removeData("groups", { id: group.id }))
      Router.replace(constant.routes.chat.HOME)
    })
      .catch(warn.error)
  }

  function deleteGroup() {

  }

  return (
    <Container>
      <Room onClick={toggleInfo}>
        <Avatar src={group.picture} />
        <h2>{group.name}</h2>
      </Room>

      <Icon onClick={() => callTo()}>
        <FiPhone />
      </Icon>

      <Icon onClick={() => callTo()}>
        <FiVideo />
      </Icon>

      <Icon onClick={() => dispatch(SettingsActions.room.toggleShowMembers())}>
        <FiUsers />
      </Icon>

      <Icon ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)}>
        <FiMoreVertical />

        {showDropdown ? (
          <Dropdown>
            {isAdm ? (
              <DropdownItem onClick={() => Router.push(constant.routes.chat.EDIT_GROUP(group.id))}>
                Editar grupo
              </DropdownItem>
            ) : null}

            <DropdownItem onClick={toggleInfo}>Dados do grupo</DropdownItem>
            <DropdownItem className="danger" onClick={() => setShowConfirmLeave(true)}>Sair do grupo</DropdownItem>

            {group.leader_id === userId ? (
              <DropdownItem className="danger" onClick={() => setShowConfirmDelete(true)}>Deletar grupo</DropdownItem>
            ) : null}
          </Dropdown>
        ) : null}
      </Icon>

      {showConfirmLeave ? (
        <>
          <div className="overlay" onClick={() => setShowConfirmLeave(false)}></div>

          <ConfirmScreen>
            <strong>Deseja realmente sair do grupo `{group.name}`?</strong>

            <div className="buttons">
              <button type="button" className="confirm" onClick={leaveGroup}>Confirmar</button>
              <button type="button" className="cancel" onClick={() => setShowConfirmLeave(false)}>Cancelar</button>
            </div>
          </ConfirmScreen>
        </>
      ) : null}

      {showConfirmDelete ? (
        <>
          <div className="overlay" onClick={() => setShowConfirmDelete(false)}></div>

          <ConfirmScreen>
            <strong>Deseja realmente DELETAR o grupo `{group.name}`?</strong>

            <div className="buttons">
              <button type="button" className="confirm" onClick={deleteGroup}>Confirmar</button>
              <button type="button" className="cancel" onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
            </div>
          </ConfirmScreen>
        </>
      ) : null}
    </Container>
  )
}