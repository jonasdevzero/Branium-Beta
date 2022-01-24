import { useState } from "react";
import Image from "next/image";
import { contactService, userService } from "~/services/api";
import { useDebounce, useWarn } from "~/hooks";
import { SearchUser } from "~/types/user";

import { Avatar } from "~/components";
import {
  InviteUser,
  Search,
  SearchIcon,
  SearchWrapper,
  User,
  Users
} from "~/styles/components/Sidebar/Plus";
import {
  FiMail,
  FiSearch,
  FiX
} from "react-icons/fi";

export default function SearchUsers() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<SearchUser[]>([]);
  const [loadingId, setLoadingId] = useState<string>();

  const warn = useWarn();

  useDebounce(() => {
    search.length && search.length > 2 ?
      userService.search(search)
        .then(users => setSearchResult(users))
        .catch(error => alert(error))
      : setSearchResult([])
  }, [search], 500)

  function inviteUser(user: SearchUser) {
    setLoadingId(user.id)
    
    contactService.invite(user.id)
      .then(() => {
        setSearchResult(searchResult.filter(u => u.id !== user.id))
        warn.success(`O convite foi enviado para ${user.username}`)
      })
      .catch((error: string) => warn.error(error))
      .then(() => setLoadingId(undefined))
  }

  return (
    <>
      <SearchWrapper>
        <Search type="text" placeholder="Pesquise um usuário" value={search} onChange={e => setSearch(e.target.value)} />

        <SearchIcon onClick={() => setSearch("")}>
          {search.length ? (<FiX />) : (<FiSearch />)}
        </SearchIcon>
      </SearchWrapper>

      <Users>
        {searchResult?.map(u => (
          <User key={u.id}>
            <Avatar size="4.5rem" src={u.picture} />
            <h4>{u.username}</h4>

            <InviteUser onClick={() => inviteUser(u)}>
              {loadingId === u.id ? (
                <Image src="/images/loading-light.svg" alt="loading" width="30" height="30" />
              ) : (<FiMail />)}
            </InviteUser>
          </User>
        ))}
      </Users>
    </>
  )
}
