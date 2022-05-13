import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import PageHeader from "../../components/PageHeader";

import "./styles.css";

function User({ history, match }) {
  const { nickname } = match.params;
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`users/nickname/${nickname}`);

      if (response.status === 200) {
        setUser(response.data);
      } else if (response.status === 400) {
        console.log("Usuário inválido");
      }
    }
    loadUser();
  }, [nickname]);

  return (
    <>
      <PageHeader />
      <div className="container-center user">
        <div className="title-container">
          <strong>Perfil</strong>
          <Link to={`${user.id}/edit`} className="edit-user-button">
            Editar
          </Link>
        </div>
        <main className="user--info-container">
          <div className="user--image">
            <span>M</span>
          </div>
          <strong>
            {user && user.firstName} {user && user.lastName}
          </strong>
          <div className="user--more">
            <span>{`@${user && user.nickname}`}</span>
            <span>{`Usuário desde ${user && user.createdAt}`}</span>
          </div>
        </main>
      </div>
    </>
  );
}

export default User;
