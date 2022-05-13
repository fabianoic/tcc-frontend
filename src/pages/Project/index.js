import React, { useState, useEffect } from "react";

import { getUserData } from "../../services/auth";
import api from "../../services/api";
import Delete from "../../assets/images/delete24.png";
import Participantes from "../../assets/images/participant.png";
import Board from "../../assets/images/boardicon.png";
import Edit from "../../assets/images/editar24.png";
import Public from "../../assets/images/public16.png";
import Private from "../../assets/images/private16.png";
import Categories from "../../assets/images/categories.png";
import PageHeader from "../../components/PageHeader";
import Modal from "../../components/Modal";
import { Button } from "../../components/Button";
import Follow from "../../assets/images/juntar24.png";

import "./styles.css";

function Project({ history, match }) {
  const [project, setProject] = useState("");
  const [reports, setReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [projectToDelete, setProjectToFollowOrDelete] = useState(null);
  const [modalTitle, setModalTitle] = useState();
  const [orderBy, setOrderBy] = useState("status");
  const [participant, setParticipant] = useState(null);
  const [reloadProject, setRealoadProject] = useState(true);
  const { user } = getUserData();
  const { id } = match.params;
  const loggedUserAdmin = project.projectOwnerId === user.id;
  const loggedUserTypeDev = participant != null && participant.userTypeId === 2;

  useEffect(() => {
    if (reloadProject) {
      async function loadProject() {
        const response = await api.get(`/projects/${id}`);

        if (response.status === 200) {
          setProject(response.data);
        } else if (response.status === 404) {
          alert("error");
        }
      }
      loadProject();
      setRealoadProject(false);
    }
  }, [id, reloadProject]);

  useEffect(() => {
    if (reloadProject) {
      async function loadProjectParticipantLogged() {
        const response = await api.get(
          `/projects/${id}/participants/${user.id}`
        );

        if (response.status === 200) {
          setParticipant(response.data);
        } else if (response.status === 404) {
          alert("error");
        }
      }
      loadProjectParticipantLogged();
    }
  }, [id, user.id, reloadProject]);

  useEffect(() => {
    async function loadProjectReports() {
      const response = await api.get(
        `/projects/${id}/reports?orderBy=${orderBy}`
      );

      if (response.status === 200) {
        setReports(response.data);
      } else if (response.status === 404) {
        alert("error");
      }
    }
    loadProjectReports();
  }, [id, orderBy]);

  const handleDelete = (e, project) => {
    e.stopPropagation();
    const name = project.name;
    const description =
      name.includes("Projeto") || name.includes("projeto") ? name : "Projeto ";
    setModalBody(`Tem certeza que deseja remover o ${description}?`);
    setModalTitle("Confirmação de Exclusão");
    setProjectToFollowOrDelete(project);
    setModalVisible(true);
  };

  const handleFollow = (e, userId) => {
    e.stopPropagation();
    const name = project.name;
    const description =
      name.includes("Projeto") || name.includes("projeto") ? name : "Projeto ";
    setModalBody(`Tem certeza que deseja se juntar ao ${description}?`);
    setModalTitle("Confirmação de Juntar-se");
    setProjectToFollowOrDelete(null);
    setModalVisible(true);
  };

  const showReport = (reportId) => {
    history.push(`/project/${id}/report/${reportId}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    history.push(`/project/${id}/edit`);
  };

  async function handleConfirm(data) {
    if (data == null) {
      const response = await api.post(`projects/${project.id}/participants`, {
        userId: user.id,
        userTypeId: 1,
      });
      if (response.status === 201) {
        setRealoadProject(true);
      } else if (response.status === 400) {
        alert("erro");
      }
    } else {
      const { id } = data;
      const response = await api.delete(`projects/${id}`);
      if (response.status === 204) {
        history.push("/projects");
      } else if (response.status === 400) {
        console.log("erro");
      }
    }
  }

  return (
    <>
      <PageHeader />
      <Modal
        title={modalTitle}
        visible={modalVisible}
        setVisible={setModalVisible}
        body={modalBody}
        data={projectToDelete}
        onConfirm={handleConfirm}
      />
      <div className="container-center project">
        <div className="title-container">
          <div className="project-info">
            <strong>{project.name}</strong>
            <div className="metadata">
              <span className="project-visibility">
                {project.visibility ? "Público" : "Privado"}
                <img
                  src={project.visibility ? Public : Private}
                  alt={`Projeto ${project.visibility ? "Público" : "Privado"}`}
                  title={`Projeto ${
                    project.visibility ? "Público" : "Privado"
                  }`}
                />
              </span>
              <span className="project-dt-create">{project.createdAt}</span>
            </div>
          </div>
          <div className="title-options">
            <select onChange={(e) => setOrderBy(e.target.value)}>
              <option value="status">Ordenar por Status</option>
              <option value="title">Ordenar por Titulo</option>
              <option value="createdAt">Ordenar por Data de Criação</option>
            </select>
            <Button color="#3b5bfd" to={`/project/${project.id}/report/new`}>
              + Novo Report
            </Button>
          </div>
        </div>
        <main className="project--container">
          <div
            className={`project-options-description${
              loggedUserAdmin ? "-admin" : ""
            }`}
          >
            <div
              className={`project-options${loggedUserAdmin ? "-admin" : ""}`}
            >
              {loggedUserAdmin ? (
                <>
                  <img
                    className="project-buttons"
                    src={Edit}
                    onClick={(e) => handleEdit(e, project.id)}
                    alt="Botão de editar"
                    title="Editar Projeto"
                  />
                  <img
                    className="project-buttons"
                    src={Delete}
                    onClick={(e) => handleDelete(e, project)}
                    alt="Botão de deletar"
                    title="Deletar Projeto"
                  />
                  <img
                    className="project-buttons"
                    src={Categories}
                    onClick={(e) => history.push(`/project/${id}/categories`)}
                    alt="Botão de Categoria"
                    title="Categorias"
                  />
                </>
              ) : (
                <></>
              )}
              {(loggedUserTypeDev || loggedUserAdmin) && (
                <>
                  <img
                    className="project-buttons"
                    src={Board}
                    onClick={(e) => history.push(`/project/${id}/board`)}
                    alt="Botão de board"
                    title="Board"
                  />
                </>
              )}
              <img
                className="project-buttons"
                src={Participantes}
                onClick={(e) => history.push(`/project/${id}/participants`)}
                alt="Botão de participantes"
                title="Participantes"
              />
              {participant == null && (
                <img
                  className="project-buttons"
                  src={Follow}
                  onClick={(e) => handleFollow(e, user.id)}
                  alt="Botão de Juntar-se"
                  title="Juntar-se"
                />
              )}
            </div>
            <div className="project-description">
              <p>{project.description}</p>
            </div>
          </div>
          <div className="project--report-cards">
            {reports.map((report) => (
              <article
                key={report.id}
                className="project--report-card"
                onClick={() => showReport(report.id)}
              >
                <header>
                  <h3>{report.title}</h3>
                  <span className={`project--report-status-${report.status}`}>
                    {report.statusDescription}
                  </span>
                </header>
                <footer>
                  <div>{report.createdAt}</div>
                </footer>
              </article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Project;
