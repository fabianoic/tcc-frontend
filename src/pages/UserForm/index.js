import React, { useEffect, useState } from "react";

import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import { TextInput } from "../../components/TextInput";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import { Button } from "../../components/Button";
import { setUserData, getUserData } from "../../services/auth";

import "./styles.css";

function UserForm({ history, match }) {
  const { id } = match.params;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    const response = await api.put(`/users/${id}`, {
      firstName,
      lastName,
      nickname,
      email,
    });

    if (response.status === 200) {
      const userData = getUserData();
      setUserData(
        { id, firstName, lastName, nickname, email },
        userData.accessToken
      );
      history.push(`/user/${nickname}`);
    } else if (response.status === 400) {
      setMessage(response.data.message);
    }
  }

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`users/${id}`);

      if (response.status === 200) {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
      } else if (response.status === 400) {
        console.log("Usuário inválido");
      }
    }
    loadUser();
  }, [id]);
  return (
    <>
      <PageHeader />
      <div className="container-center user">
        <div className="name-container">
          <strong>Editar Perfil</strong>
        </div>
        <main className="user--container">
          <form onSubmit={handleCreateOrUpdate}>
            <div className="user--block">
              <TextInput
                placeholder="Primeiro nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="user--block">
              <TextInput
                placeholder="Ultimo nome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="user--block">
              <TextInput
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="user--block">
              <TextInput
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="user--block">
              <TextInput
                type="password"
                placeholder="Antiga senha"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="user--block">
              <TextInput
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="user--block">
              <TextInput
                type="password"
                placeholder="Confirmação nova senha"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            {message == null ? "" : <p>{message}</p>}
            <div className="user--options">
              <ButtonSubmit color="#00994c" type="submit">
                Salvar
              </ButtonSubmit>
              <Button color="#FF6666" to={`/user/${nickname}`}>
                Cancelar
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default UserForm;
