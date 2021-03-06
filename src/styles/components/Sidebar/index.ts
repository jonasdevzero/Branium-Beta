import styled from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex: 0.25;
  height: 100vh;
  min-width: 32rem;

  position: relative;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #131313;
`;

/* Options Asside */

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  min-width: 7rem;
  padding-bottom: 1rem;

  background-color: #101010;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 7.2rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  border-bottom: solid 0.2rem #202020;

  .MuiAvatar-root {
    width: 5rem;
    height: 5rem;
  }
`;

export const OptionsInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const Option = styled.button`
  width: 5rem;
  min-height: 5rem;
  max-height: 5rem;
  position: relative;

  border: none;
  outline: none;
  border-radius: 50%;

  background-color: #181818;
  cursor: pointer;
  transition: background-color .2s ease-in-out;

  svg {
    color: #eee;
    font-size: 2.5rem;
  }

  & + & {
    margin-top: 2rem;
  }

  :hover {
    background-color: #222;
  }
`;

type OptionSelectedProps = {
  pending: boolean;
  selected: boolean;
};
export const OptionSelected = styled.span<OptionSelectedProps>`
  position: absolute;
  top: 50%;
  left: -1rem;
  transform: translateY(-50%);

  width: 0.2rem;
  height: ${({ pending, selected }) =>
    selected ? '3.5rem' : pending ? '1.2rem' : 0};
  background-color: #fff;

  transition: height 0.3s ease-in-out;
`;

export const OptionsPlus = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: solid 0.2rem #202020;

  ${Option} + ${Option} {
    margin-top: 1.5rem;
  }
`;

/* Header Styles  */

export const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 7.2rem;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: solid 0.2rem #202020;
`;
export const HeaderTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  font-family: 'Noto Sans', sans-serif;
`;

export const HeaderPending = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  background-color: #202020;
  color: #fff;

  margin-left: 1rem;
  margin-right: auto;
`;

/* Search Styles */

export const Search = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  border-bottom: solid 0.2rem #202020;
  padding: 0 1.5rem 1.5rem 1.5rem;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: 3.5rem;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;

  background-color: #202020;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 2rem;
  padding: 0 3.5rem 0 1.2rem;
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    color: lightgray;
    font-size: 1.8rem;
  }
`;

/* Rooms Styles */

export const RoomsContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 0 1rem;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #202020;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #252525;
  }
`;

export const Room = styled.div`
  width: 100%;
  height: 7rem;

  display: flex;
  align-items: center;

  border-bottom: solid 0.1rem #202020;
  padding: 0 1rem;

  transition: opacity 0.2s ease;
  cursor: pointer;

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-left: 1rem;
    text-overflow: ellipsis;
  }

  :hover {
    opacity: 0.85;
  }
`;

export const Status = styled.p`
  width: 0.5rem;
  height: 0.5rem;

  margin-left: 0.5rem;
  border-radius: 50%;

  &.online {
    background-color: green;
  }
  &.offline {
    background-color: lightgray;
  }
`;

export const UnreadMessages = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  background-color: #202020;
  color: #fff;

  margin-left: auto;
  margin-right: 1rem;
`;

export const PendingInvitations = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.7rem;
  height: 2.7rem;
  position: absolute;
  bottom: -1.3rem;
  right: -0.6rem;

  background-color: #080808;
  color: #fff;
  border: solid 0.3rem #101010;
  border-radius: 1.5rem;
`;
