import React, { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";

import { getUserData } from "../../services/auth";
import api from "../../services/api";
import Delete from "../../assets/images/delete24.png";
import Edit from "../../assets/images/editar24.png";
import PageHeader from "../../components/PageHeader";
import Modal from "../../components/Modal";
import { UserTypeParticipant } from "../../config/Constants";
import { TextInput } from "../../components/TextInput";

import "./styles.css";

function ProjectParticipants({ history, match }) {
  const [project, setProject] = useState("");
  const [participants, setParticipants] = useState([]);
  const [userType, setUserType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [participantToAddOrDelete, setParticipantToAddOrDelete] = useState(
    null
  );
  const [reloadParticipants, setReloadParticipants] = useState(null);
  const [searchParticipant, setSearchParticipant] = useState([]);
  const [searchParticipantInput, setSearchParticipantInput] = useState(null);
  const { user } = getUserData();
  const { id } = match.params;
  const loggedUserAdmin = project.projectOwnerId === user.id;

  useEffect(() => {
    async function loadProject() {
      const response = await api.get(`/projects/${id}`);

      if (response.status === 200) {
        setProject(response.data);
      } else if (response.status === 404) {
        alert("error");
      }
    }
    loadProject();
  }, [id]);

  useEffect(() => {
    async function loadProjectParticipants() {
      const response = await api.get(`/projects/${id}/participants`);

      if (response.status === 200) {
        setParticipants(response.data);
      } else if (response.status === 404) {
        alert("error");
      }
    }
    setReloadParticipants(null);
    loadProjectParticipants();
  }, [id, reloadParticipants]);

  useEffect(() => {
    if (searchParticipantInput !== null && searchParticipantInput !== "") {
      async function loadUsersParticipants() {
        const response = await api.get(
          `/projects/${id}/participants/invitation?nameValue=${searchParticipantInput}`
        );

        if (response.status === 200) {
          setSearchParticipant(response.data);
        } else if (response.status === 404) {
        }
      }
      loadUsersParticipants();
    }
  }, [id, searchParticipantInput]);

  const handleDelete = (e, participant) => {
    e.stopPropagation();
    const description = `Tem certeza que deseja ${
      participant.id === user.id
        ? "remover você deste Projeto?"
        : `remover o ${participant.nickname}`
    }`;
    setModalBody(description);
    setModalTitle("Confirmação de Exclusão");
    setParticipantToAddOrDelete(participant);
    setUserType(null);
    setModalVisible(true);
  };

  const handleEdit = (e, participant) => {
    e.stopPropagation();
    if (participant.id === userType.id) {
      setModalBody(
        `Tem certeza que deseja alterar o(a) ${participant.nickname}?`
      );
      setModalTitle("Confirmação de Edição");
      setParticipantToAddOrDelete(null);
      setModalVisible(true);
    } else {
      alert("Por favor, altere o tipo do usuário correspondente");
    }
  };

  const handleAdd = (e, participant) => {
    e.stopPropagation();
    if (participant.id === userType.id) {
      setModalBody(
        `Tem certeza que deseja adicionar o(a) ${participant.nickname} ao projeto?`
      );
      setModalTitle("Confirmação de Adição");
      setParticipantToAddOrDelete(participant);
      setModalVisible(true);
    } else {
      alert("Por favor, altere o tipo do usuário correspondente");
    }
  };

  async function handleConfirm(data) {
    if (data === null) {
      const response = await api.put(
        `projects/${project.id}/participants/${userType.id}`,
        {
          projectId: project.id,
          userId: userType.id,
          userTypeId: userType.userTypeId,
        }
      );
      if (response.status === 204) {
        alert("Tipo do usuário alterado com sucesso");
      } else if (response.status === 400) {
        alert("erro");
      }
    } else {
      if (userType === null) {
        const { id } = data;
        const response = await api.delete(
          `projects/${project.id}/participants/${id}`
        );
        if (response.status === 204) {
          const participantsNew = participants.filter((p) => p.id !== id);
          setParticipants(participantsNew);
          if (id === user.id) {
            history.push("/projects");
          }
        } else if (response.status === 400) {
          console.log("erro");
        }
      } else {
        const response = await api.post(`projects/${project.id}/participants`, {
          userId: userType.id,
          userTypeId: userType.userTypeId,
        });
        if (response.status === 201) {
          participants.push(response.data);
          setSearchParticipant([]);
          setSearchParticipantInput("");
        } else if (response.status === 400) {
          alert("erro");
        }
      }
    }
    setReloadParticipants(true);
  }

  return (
    <>
      <PageHeader />
      <Modal
        title={modalTitle}
        visible={modalVisible}
        setVisible={setModalVisible}
        body={modalBody}
        data={participantToAddOrDelete}
        onConfirm={handleConfirm}
      />
      <div className="container-center participants">
        <div className="title-container">
          <div className="participants-info">
            <strong>{project.name}</strong>
          </div>
        </div>
        <main className="participants--container">
          <div className="new-participant">
            <div className="search-participant">
              <TextInput
                placeholder="Pesquisar usuário"
                value={searchParticipantInput}
                disabled={!loggedUserAdmin}
                onChange={(e) => setSearchParticipantInput(e.target.value)}
              />
            </div>
            {searchParticipant.map((participant) => (
              <>
                <div className="search-participant-item">
                  <div className="search-participant-info">
                    <span
                      className="search-participant-img"
                      key={participant.id}
                    >
                      {participant.firstName && participant.firstName[0]}
                    </span>
                    <span className="search-participant-nickname">
                      {participant.nickname}
                    </span>
                  </div>
                  <div>
                    <div className="search-participant-options">
                      <select
                        onChange={(e) =>
                          setUserType({
                            id: participant.id,
                            userTypeId: e.target.value,
                          })
                        }
                      >
                        <option>Selecione um Tipo de Usuário</option>
                        {UserTypeParticipant.map((userTypeParticipant) => (
                          <option
                            key={userTypeParticipant.value}
                            value={userTypeParticipant.value}
                            disabled={!loggedUserAdmin}
                          >
                            {userTypeParticipant.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={(e) => handleAdd(e, participant)}
                        disabled={!loggedUserAdmin}
                      >
                        <MdAdd size={16} color="#FFF" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="participants-list">
            {participants.map((participant) => (
              <div className="participant-item">
                <div className="participant-info">
                  <span className="participant-img" key={participant.id}>
                    {participant.firstName && participant.firstName[0]}
                  </span>
                  <span className="participant-nickname">
                    {participant.nickname}
                  </span>
                </div>
                <div className="participant-options">
                  <select
                    onChange={(e) =>
                      setUserType({
                        id: participant.id,
                        userTypeId: e.target.value,
                      })
                    }
                  >
                    {UserTypeParticipant.map((userTypeParticipant) => (
                      <option
                        key={userTypeParticipant.value}
                        value={userTypeParticipant.value}
                        disabled={!loggedUserAdmin}
                        selected={
                          userTypeParticipant.value === participant.userTypeId
                        }
                      >
                        {userTypeParticipant.label}
                      </option>
                    ))}
                  </select>
                  {loggedUserAdmin && participant.id !== user.id && (
                    <>
                      <img
                        className="participant-buttons"
                        src={Edit}
                        onClick={(e) => handleEdit(e, participant)}
                        alt="Botão de editar"
                        title="Editar Participante"
                      />
                      <img
                        className="participant-buttons"
                        src={Delete}
                        onClick={(e) => handleDelete(e, participant)}
                        alt="Botão de deletar"
                        title={`${
                          loggedUserAdmin
                            ? "Remover Participante"
                            : "Remover Você deste Projeto?"
                        }`}
                      />
                    </>
                  )}
                  {!loggedUserAdmin && participant.id === user.id && (
                    <img
                      className="participant-buttons"
                      src={Delete}
                      onClick={(e) => handleDelete(e, participant)}
                      alt="Botão de deletar"
                      title={`${
                        loggedUserAdmin
                          ? "Remover Participante"
                          : "Remover Você deste Projeto?"
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default ProjectParticipants;
