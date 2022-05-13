import React, { useState } from "react";

import { ButtonSubmit } from "../../components/ButtonSubmit";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import { TextInput } from "../../components/TextInput";

import "./styles.css";
import "../../styles/global.css";

function Cadastro({ history }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState();

  async function handleCadastro(e) {
    e.preventDefault();
    const response = await api.post("/users", {
      firstName,
      lastName,
      email,
      nickname,
      password,
      confirmPassword,
    });

    if (response.status === 201) {
      history.push("/login");
    } else if (response.status === 400) {
      setMessage(response.message);
    }
  }

  return (
    <>
      <PageHeader />
      <div className="container-center register">
        <div className="register--container">
          {message == null ? "" : <p>{message}</p>}
          <strong>Cadastro</strong>
          <form onSubmit={handleCadastro}>
            <TextInput
              placeholder="Primeiro Nome"
              name="nome"
              id="nome"
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInput
              placeholder="Ultimo Sobrenome"
              id="lastname"
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextInput
              placeholder="E-mail"
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              placeholder="Nickname"
              id="nickname"
              required
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TextInput
              placeholder="Senha"
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
              placeholder="Confirmação de senha"
              id="confirmPassword"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="register--buttons">
              <ButtonSubmit color="#00994c" register type="submit">
                Cadastrar-se
              </ButtonSubmit>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
