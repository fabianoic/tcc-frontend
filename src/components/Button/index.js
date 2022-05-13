import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled(Link)`
  ${(props) =>
    props.menu
      ? `      
      cursor: pointer;
      color: #BFBFBF;
      margin-right: 10px;
      font-family: Roboto;
      font-style: normal;
      font-size: 15px;
      height: fit-content;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: #FFFFFF;
        text-decoration: underline #FFFFFF;
      }`
      : `      
      background: ${props.color};
      color: #FFFFFF;
      ${props.login || props.register ? "width: 100%;" : ""}
      text-align: center;
      border: 1px solid #333333;
      border-radius: 5px;
      padding: 8px 12px;
      font-family: Roboto;
      font-style: normal;
      font-size: 14px;
      height: fit-content;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        background: #FFFFFF;
        color: ${props.color};
}`}
`;

export const ButtonLogo = styled.button`
  background: transparent;
  text-decoration: none;
  border: 0;
  cursor: pointer;
`;
