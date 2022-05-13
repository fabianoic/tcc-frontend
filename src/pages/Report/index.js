import React, { useEffect, useState, useRef } from "react";

import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import { Button } from "../../components/Button";
import { getUserData } from "../../services/auth";
import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/editar.png";
import Follow from "../../assets/images/juntar.png";

import "./styles.css";

function Report({ history, match }) {
  const [report, setReport] = useState({});
  const { reportid } = match.params;
  const { id } = match.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comment, setComment] = useState({});
  const [participants, setParticipants] = useState([]);
  const textareaEl = useRef(null);

  const { user } = getUserData();

  useEffect(() => {
    async function loadReport() {
      const response = await api.get(`/reports/${reportid}`);

      if (response.status === 200) {
        setReport(response.data);
      } else if (response.status === 404) {
        alert("error");
      }
    }
    loadReport();
  }, [reportid]);

  useEffect(() => {
    async function loadReportComments() {
      const response = await api.get(`/reports/${reportid}/comments`);

      if (response.status === 200) {
        setComments(response.data);
      } else if (response.status === 404) {
        alert("error");
      }
    }
    loadReportComments();
  }, [reportid]);

  useEffect(() => {
    async function loadReportParticipants() {
      const response = await api.get(`/reports/${reportid}/participants`);

      if (response.status === 200) {
        setParticipants(response.data);
      } else if (response.status === 404) {
        alert("error");
      }
    }
    loadReportParticipants();
  }, [reportid]);

  const handleEdit = (e, reportId) => {
    e.stopPropagation();
    history.push(`/project/${id}/report/${reportId}/edit`);
  };

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    if (comment && comment.id != null) {
      const response = await api.put(
        `reports/${reportid}/comments/${comment.id}`,
        { id: comment.id, comment: newComment }
      );

      if (response.status === 200) {
        setComments(response.data);
        setNewComment("");
        setComment({});
      } else if (response.status === 400) {
        console.log("erro");
      }
    } else if (newComment && newComment.length > 0) {
      const response = await api.post(`reports/${reportid}/comments`, {
        reportId: reportid,
        userId: user.id,
        comment: newComment,
      });

      if (response.status === 200) {
        setComments(response.data);
        setNewComment("");
      } else if (response.status === 400) {
        alert("error");
      }
    }
  }

  async function handleJoin(e) {
    e.preventDefault();
    const response = await api.post(`reports/${reportid}/participants`, {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      userTypeId: 1,
    });
    if (response.status === 200) {
      setParticipants(response.data);
    } else if (response.status === 400) {
      console.log("erro");
    }
  }

  async function handleDeleteComment(e, commentId) {
    e.preventDefault();
    const response = await api.delete(
      `reports/${reportid}/comments/${commentId}`
    );
    if (response.status === 200) {
      setComments(response.data);
    } else if (response.status === 400) {
      console.log("erro");
    }
  }

  async function handleRemoveParticipant(e, participantId) {
    e.preventDefault();
    const response = await api.delete(
      `reports/${reportid}/participants/${participantId}`
    );

    if (response.status === 200) {
      setParticipants(response.data);
    } else if (response.status === 404) {
      console.log("erro");
    }
  }

  return (
    <>
      <PageHeader />
      <div className="container-center report">
        <div className="report--info-container">
          <div className="info">
            <div className="header-info">
              <strong>{report.title}</strong>
              <div className="report-actions">
                {participants.find((p) => p.id === user.id) ? (
                  ""
                ) : (
                  <img
                    className="project-report-card-buttons"
                    src={Follow}
                    onClick={(e) => handleJoin(e)}
                    alt="Botão de Juntar-se"
                  />
                )}
                <img
                  className="project-report-card-buttons"
                  src={Edit}
                  onClick={(e) => handleEdit(e, report.id)}
                  alt="Botão de editar"
                />
              </div>
            </div>
            <div className="metadata">
              <span className="report-status">{report.statusDescription}</span>
              <span className="report-dt-create">{report.createdAt}</span>
            </div>
            <div className="report-participants">
              {participants.map((participant) => (
                <span
                  className="user-participant"
                  title={
                    report.userId === user.id && participant.id !== user.id
                      ? `Excluir ${participant.firstName} ${participant.lastName} ?`
                      : participant.id === user.id &&
                        participant.id !== report.userId
                      ? `Remover você do report ?`
                      : `${participant.firstName} ${participant.lastName} `
                  }
                  key={participant.id}
                  onClick={(e) => handleRemoveParticipant(e, participant.id)}
                >
                  {participant.firstName && participant.firstName[0]}
                </span>
              ))}
            </div>
            <p>{report.description}</p>
          </div>
        </div>
        <div className="comments-reports">
          <strong>Comentários</strong>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="user-comment-info">
                <div className="user-info">
                  <p>
                    {comment.participant.firstName}{" "}
                    {comment.participant.lastName}
                  </p>
                  <span>{comment.participant.userType}</span>
                </div>
                <div className="comment-actions">
                  {comment.participant.id === user.id ? (
                    <div className="report-actions">
                      <img
                        className="project-report-card-buttons"
                        src={Edit}
                        onClick={() => {
                          setComment(comment);
                          setNewComment(comment.comment);
                          textareaEl.current.focus();
                        }}
                        alt="Botão de editar"
                      />
                      <img
                        className="project-report-card-buttons"
                        src={Delete}
                        onClick={(e) => handleDeleteComment(e, comment.id)}
                        alt="Botão de deletar"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <span className="report-dt-create">{comment.createdAt}</span>
                </div>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}

          <form onSubmit={handleCreateOrUpdate}>
            <div className="textarea-comment">
              <textarea
                ref={textareaEl}
                placeholder="Adicionar um novo comentário"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <ButtonSubmit color="#00994c" type="submit">
              {comment && comment.id != null ? "Editar" : "Publicar"}
            </ButtonSubmit>
            {comment && comment.id != null ? (
              <Button
                to={history}
                color="#FF6666"
                onClick={() => {
                  setComment({});
                  setNewComment("");
                }}
              >
                Cancelar
              </Button>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Report;
