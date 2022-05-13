import React, { useEffect, useState } from "react";
import api from "../../services/api";

import { getUserData } from "../../services/auth";
import PageHeader from "../../components/PageHeader";
import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/editar.png";
import { Button } from "../../components/Button";
import Private from "../../assets/images/private.png";
import Public from "../../assets/images/public.png";

import "../../styles/global.css";
import "./styles.css";

import Modal from "../../components/Modal";

function ProjectList({ history }) {
  const [projects, setProjects] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [orderBy, setOrderBy] = useState("name");

  const { user } = getUserData();

  useEffect(() => {
    async function loadProjects() {
      const response = await api.get(`projects/myprojects?orderBy=${orderBy}`);
      setProjects(response.data);
    }
    loadProjects();
  }, [orderBy]);

  useEffect(() => {
    async function loadOpenProjects() {
      const response = await api.get(
        `projects/openprojects?orderBy=${orderBy}`
      );
      setOpenProjects(response.data);
    }
    loadOpenProjects();
  }, [orderBy]);

  const handleDelete = (e, project) => {
    e.stopPropagation();
    const name = project.name;
    const description =
      name.includes("Projeto") || name.includes("projeto") ? name : "Projeto ";
    setModalBody(`Tem certeza que deseja remover o ${description}?`);
    setProjectToDelete(project);
    setModalVisible(true);
  };

  const handleEdit = (e, projectId) => {
    e.stopPropagation();
    history.push(`/project/${projectId}/edit`);
  };

  async function handleConfirm(data) {
    const { id } = data;
    const response = await api.delete(`projects/${id}`);
    if (response.status === 204) {
      const projectsNew = projects.filter((p) => p.id !== id);
      setProjects(projectsNew);
    } else if (response.status === 400) {
      console.log("erro");
    }
  }

  const showProject = (projectId) => {
    history.push(`/project/${projectId}`);
  };

  return (
    <>
      <PageHeader />
      <Modal
        title="Confirmação de exclusão"
        visible={modalVisible}
        setVisible={setModalVisible}
        body={modalBody}
        data={projectToDelete}
        onConfirm={handleConfirm}
      />

      <div className="container-center project-list">
        <div className="owner-project-list">
          <div className="title-container">
            <strong>Meus Projetos</strong>
            <div className="title-options">
              <select onChange={(e) => setOrderBy(e.target.value)}>
                <option value="name">Ordenar por Nome</option>
                <option value="visibility">Ordenar por Visibilidade</option>
                <option value="createdAt">Ordenar por Data de Criação</option>
              </select>
              <Button to="/project/new" color="#3b5bfd">
                + Criar Projeto
              </Button>
            </div>
          </div>
          <main className="project-list--cards-container">
            {projects.length >= 1 ? (
              projects.map((project) => (
                <article
                  key={project.id}
                  className="project-list--card"
                  onClick={() => showProject(project.id)}
                >
                  <header>
                    <h3>{project.name}</h3>
                    <img
                      src={project.visibility ? Public : Private}
                      alt={`Projeto ${
                        project.visibility ? "Público" : "Privado"
                      }`}
                      title={`Projeto ${
                        project.visibility ? "Público" : "Privado"
                      }`}
                    />
                  </header>
                  <footer>
                    <div>{project.createdAt}</div>
                    {project.projectOwnerId === user.id ? (
                      <div>
                        <img
                          className="project-list--card-buttons"
                          src={Edit}
                          onClick={(e) => handleEdit(e, project.id)}
                          alt="Botão de editar"
                        />
                        <img
                          className="project-list--card-buttons"
                          src={Delete}
                          onClick={(e) => handleDelete(e, project)}
                          alt="Botão de deletar"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </footer>
                </article>
              ))
            ) : (
              <div>
                <p className="my-projects-message">
                  Você ainda não está participando de nenhum projeto. Junte-se a
                  projetos Públicos.
                </p>
              </div>
            )}
          </main>
        </div>
        <div className="owner-project-list">
          <div className="title-container">
            <strong>Projetos Públicos</strong>
          </div>
          <main className="project-list--cards-container">
            {openProjects.map((project) => (
              <article
                key={project.id}
                className="project-list--card"
                onClick={() => showProject(project.id)}
              >
                <header>
                  <h3>{project.name}</h3>
                  <img
                    src={project.visibility ? Public : Private}
                    alt={`Projeto ${
                      project.visibility ? "Público" : "Privado"
                    }`}
                    title={`Projeto ${
                      project.visibility ? "Público" : "Privado"
                    }`}
                  />
                </header>
                <footer>
                  <div>{project.createdAt}</div>
                  {project.projectOwnerId === user.id ? (
                    <div>
                      <img
                        className="project-list--card-buttons"
                        src={Edit}
                        onClick={(e) => handleEdit(e, project.id)}
                        alt="Botão de editar"
                      />
                      <img
                        className="project-list--card-buttons"
                        src={Delete}
                        onClick={(e) => handleDelete(e, project)}
                        alt="Botão de deletar"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </footer>
              </article>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
