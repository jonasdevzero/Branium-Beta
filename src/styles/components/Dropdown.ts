import styled from "styled-components";

export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translateX(-80%) translateY(10%);

  width: 18rem;
  background-color: #0f0f0f;
  padding: .7rem 0;

  z-index: 1;
`;

export const DropdownItem = styled.span`
  padding: 1rem;
  font-size: 1.4rem;

  transition: background-color .3s ease;

  :hover {
    background-color: #202020;
  }

  &.danger {
    color: #dc3545;
  }
`;