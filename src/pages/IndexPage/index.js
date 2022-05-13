import React from "react";

import PageHeader from "../../components/PageHeader";

import { Container, Strong, ContainerText, ContainerImage } from "./styles";
import IndexImage from "../../assets/images/indexImage.png";

function IndexPage() {
  return (
    <>
      <PageHeader />
      <Container>
        <ContainerText>
          <Strong>Mais controle sobre o seus feedbacks</Strong>
          <span>
            Descomplique a forma com que você recebe feedback dos seus clientes.
          </span>
        </ContainerText>
        <ContainerImage>
          <img src={IndexImage} alt={`Gerencimaneto`} />
        </ContainerImage>
      </Container>
    </>
  );
}

export default IndexPage;
