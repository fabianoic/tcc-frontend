import React, { useState } from "react";

import api from "../../services/api";
import { setUserData } from "../../services/auth";
import PageHeader from "../../components/PageHeader";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import { TextInput } from "../../components/TextInput";

import "./styles.css";
import "../../styles/global.css";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();

    const response = await api.post("/login", {
      email,
      password,
    });
    if (response.status === 200) {
      const accessToken = response.headers.authorization;
      const userData = response.data;

      setUserData(userData, accessToken);
      history.push("/projects");
    } else if (response.status === 401) {
      setMessage(response.data.message);
    }
  }

  return (
    <>
      <PageHeader />
      <div className="container-center login">
        <div className="login--container">
          {message == null ? "" : <p>{message}</p>}
          <strong>Login</strong>
          <form onSubmit={handleLogin}>
            <TextInput
              placeholder="E-mail"
              name="email"
              id="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              placeholder="Senha"
              name="password"
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login--buttons">
              <ButtonSubmit color="#00994c" login type="submit">
                Entrar
              </ButtonSubmit>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
