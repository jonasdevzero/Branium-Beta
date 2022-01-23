import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  display: flex;
  width: 50rem;
  height: 40rem;
  border: solid 0.2rem #151515;

  background-color: #131313;
  font-family: 'Noto Sans', sans-serif;
  z-index: 2;  
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  height: 100%;
  background-color: #101010;

  padding: 0.5rem;
`;

type OptionSelectedData = {
  selected: boolean;
};

export const OptionSelected = styled.span<OptionSelectedData>`
  position: absolute;
  top: 50%;
  left: -0.3rem;

  width: 0.1rem;
  height: ${({ selected }) => (selected ? '3rem' : '0')};
  background-color: #eee;

  transition: height 0.3s ease;

  transform: translateY(-50%);
`;

export const OptionPending = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  position: absolute;
  bottom: -0.8rem;
  right: 0;

  background-color: #090909;
  border-radius: 1rem;
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;

  &:hover {
    ${OptionSelected} {
      height: 3rem;
    }
  }
`;

export const Option = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;

  border: none;
  border-radius: 50%;

  background-color: #202020;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    font-size: 2.2rem;
    color: #ffffff;
  }
`;

export const Margin = styled.span`
  width: 100%;
  height: 1.5rem;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 6.5rem;
  padding: 0 1.5rem;

  background-color: #111;

  h3 {
    font-size: 2rem;
    font-weight: 500;
    color: #eee;
  }
`;

export const Close = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  svg {
    font-size: 2.3rem;
    color: #fff;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  padding: 1.5rem;
  overflow: hidden;
`;

export const Search = styled.input`
  width: 100%;
  height: 4rem;

  background-color: #181818;
  border: none;
  border-radius: 5rem;
  outline: none;
  padding: 0 4rem 0 1.5rem;

  color: #eee;
  font-size: 1.5rem;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 80%;
`;

export const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 1.5rem;
  cursor: pointer;

  transform: translateY(-50%);

  svg {
    font-size: 1.8rem;
  }
`;

export const Users = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  width: 80%;
  max-height: 26rem;
  margin-top: 1.5rem;
  overflow-y: scroll;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 5.5rem;

  padding: 0 1rem 0 1.5rem;
  background-color: #131313;

  h4 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-left: 1rem;
  }

  & + & {
    border-top: solid 0.1rem #171717;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }
`;

export const InviteUser = styled.button`
  display: flex;
  margin-left: auto;
  margin-right: 0.5rem;

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    color: #fff;
    font-size: 1.8rem;
  }
`;

export const InviteOptions = styled.div`
  margin-left: auto;
`;

export const InviteOption = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  &.accept {
    color: #28a745;
  }
  &.refuse {
    color: #dc3545;
  }

  svg {
    font-size: 2.2rem;
  }

  & + & {
    margin-left: 1.5rem;
  }
`;

export const NoInvites = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  h4 {
    font-size: 1.5rem;
    color: lightgray;
    font-weight: 500;
  }

  h4 + h4 {
    margin-top: 1rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;

    border: none;
    border-radius: 50%;
    margin-top: 1.5rem;

    background-color: #202020;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }

    svg {
      font-size: 1.8rem;
      color: #ffffff;
    }
  }
`;
