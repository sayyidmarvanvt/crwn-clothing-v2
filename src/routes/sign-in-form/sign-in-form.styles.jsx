import { Link } from "react-router-dom";
import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ToggleLink = styled(Link)`
  cursor: pointer;
  color: blue;
  font-weight: bold;

  &:hover {
    color: darkblue;
  }
`;
