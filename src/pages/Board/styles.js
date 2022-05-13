import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 30px 250px;
  height: calc(100% - 80%);
  flex-direction: column;
`;

export const ContainerList = styled.div`
  display: flex;
  padding-top: 30px;
`;

export const Strong = styled.strong`
  font-size: 30px;
  color: #666666;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    margin: 0 5px;
  }
`;
