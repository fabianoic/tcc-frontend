import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { TextInput } from "../../components/TextInput";
import { Button, ButtonLogo } from "../../components/Button";
import logo from "../../assets/images/Logo.png";
import { isAuthenticated, getUserData, logout } from "../../services/auth";

import "./styles.css";

function PageHeader() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      const { user } = getUserData();
      setLoggedUser(user);
    }
  }, []);

  return (
    <header className="page-header">
      <div className="container-center top-bar-container">
        <Link exact to={loggedUser == null ? "/" : "/projects"}>
          <img src={logo} alt="FidBack Logo" />
        </Link>
        <div
          className={
            !isAuthenticated()
              ? `navigation-bar`
              : `navigation-bar-isAuthenticated`
          }
        >
          {!isAuthenticated() ? (
            <>
              <Link className="create-account-button" to="/cadastro">
                Criar uma conta
              </Link>
              <Link className="login-button" to="/login">
                Entrar
              </Link>
            </>
          ) : (
            <>
              <div className="menu-navigation">
                <div className="search-navigation">
                  <TextInput
                    placeholder="Pesquisar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="page-menu-navigation">
                  <Button menu="true" to="/projects">
                    Projetos
                  </Button>
                  <Button menu="true" to="/reports">
                    Reports
                  </Button>
                </div>
                <div className="user-menu-navigation">
                  <Button
                    menu="true"
                    to={`/user/${loggedUser && loggedUser.nickname}`}
                  >
                    {loggedUser && loggedUser.nickname}
                  </Button>
                  <Button
                    menu="true"
                    to="/"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Sair
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
