import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  background-color: #131313;
  z-index: 2;

  width: 34rem;
  height: 45rem;
  padding: 1.5rem;
  border: solid 0.1rem #151515;
`;

export const Close = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2.5rem;
  cursor: pointer;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const Username = styled.span`
  font-size: 2.5rem;
  margin-top: 1rem;
`;

export const Dropdown = styled.div`
  position: absolute;
  bottom: 0;
  right: 1.5rem;
  cursor: pointer;
`;

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  position: absolute;
  right: -15rem;
  top: 2.7rem;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const DropdownItem = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.4rem;
  padding: 0.8rem 0.5rem;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  &.danger {
    color: #dc3545;
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: -webkit-fill-available;
  margin-top: 3rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Option = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: lightgray;
  font-size: 1.5rem;
  width: 13rem;

  position: relative;
  cursor: pointer;

  & + & {
    margin-left: 2rem;
  }
`;

type OptionSelectedType = {
  selected: boolean;
};
export const OptionSelected = styled.span<OptionSelectedType>`
  position: absolute;
  bottom: -0.3rem;
  left: 50%;
  transform: translateX(-50%);

  width: ${({ selected }) => (selected ? '100%' : '0')};
  height: 0.1rem;
  background-color: darkgray;

  transition: width 0.3s ease;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  color: lightgray;
`;
