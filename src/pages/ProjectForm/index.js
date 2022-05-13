import React, { useState, useEffect } from "react";

import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import Private from "../../assets/images/private.png";
import Public from "../../assets/images/public.png";

import "./styles.css";

function ProjectForm({ history, match }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");

  const { id } = match.params;

  useEffect(() => {
    async function loadProject() {
      if (id != null) {
        console.log("entrou");
        const response = await api.get(`/projects/${id}`);
        if (response.status === 200) {
          setName(response.data.name);
          setDescription(response.data.description);
          setVisibility(response.data.visibility);
        } else if (response.status === 404) {
        }
      }
    }
    loadProject();
  }, [id]);

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    if (id != null) {
      const response = await api.put(`/projects/${id}`, {
        name,
        description,
        visibility,
      });

      if (response.status === 200) {
        history.push("/projects");
      } else if (response.status === 400) {
        console.log("erro");
      }
    } else {
      const response = await api.post("/projects", {
        name,
        description,
        visibility,
      });
      if (response.status === 201) {
        history.push("/projects");
      } else if (response.status === 400) {
        setMessage(response.data.message);
      }
    }
  }

  return (
    <>
      <PageHeader />
      <div className="container-center project-form">
        <div className="name-container">
          <strong>Novo Projeto</strong>
        </div>
        <main className="project-form--container">
          <form onSubmit={handleCreateOrUpdate}>
            <div className="project-form--block">
              <TextInput
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="project-form--block">
              <textarea
                placeholder="Escreva brevemente sobre o que é este projeto..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="project-form--block-visibility">
              <div className="checkbox-container">
                <input
                  checked={visibility}
                  onChange={(e) => setVisibility(e.target.checked)}
                  type="checkbox"
                />
                <span>{visibility ? "Público" : "Privado"}</span>
                <img
                  src={visibility ? Public : Private}
                  alt={`${visibility ? "Público" : "Privado"}`}
                  title={`Projeto ${visibility ? "Público" : "Privado"}`}
                />
              </div>
            </div>
            {message == null ? "" : <p>{message}</p>}
            <div className="project-form--options">
              <ButtonSubmit color="#00994c" type="submit">
                Salvar
              </ButtonSubmit>
              <Button color="#FF6666" to="/projects">
                Cancelar
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default ProjectForm;
