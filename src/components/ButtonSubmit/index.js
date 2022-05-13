import styled from "styled-components";

export const ButtonSubmit = styled.button`
  background: ${(props) => props.color};
  color: #ffffff;
  ${(props) =>
    props.login || props.register ? "width: 100%; text-align: center;" : ""}
  border: 1px solid #333333;
  border-radius: 5px;
  padding: 8px 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  height: fit-content;
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    background: #ffffff;
    color: ${(props) => props.color};
  }
`;
