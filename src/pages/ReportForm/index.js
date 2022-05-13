import React, { useEffect, useState } from "react";

import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { ButtonSubmit } from "../../components/ButtonSubmit";
import { getUserData } from "../../services/auth";
import { StatusReportEnum } from "../../config/Constants";

import "./styles.css";

function ReportForm({ history, match }) {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);
  const [category, setCategory] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const [message, setMessage] = useState("");

  const { id } = match.params;
  const { reportid } = match.params;
  const { user } = getUserData();

  useEffect(() => {
    async function loadCategorys() {
      const response = await api.get(`/categories/project/${id}`);

      if (response.status === 200) {
        setCategorys(response.data);
      } else if (response.status === 404) {
        alert("error");
      }
    }
    loadCategorys();
  }, [id]);

  useEffect(() => {
    async function loadReport() {
      if (reportid != null) {
        const response = await api.get(`/reports/${reportid}`);

        if (response.status === 200) {
          const report = response.data;
          setTitle(report.title);
          setUserId(report.userId);
          setDescription(report.description);
          setCategory(report.categoryId);
          setStatus(report.status);
        } else if (response.status === 400) {
          alert("error");
        }
      }
    }
    loadReport();
  }, [reportid]);

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    const report = {
      title,
      description,
      status: parseInt(status),
      projectId: parseInt(id),
      categoryId: parseInt(category),
      userId: user.id,
    };

    if (reportid != null) {
      const response = await api.put(`reports/${reportid}`, report);

      if (response.status === 200) {
        history.goBack();
      } else if (response.status === 400) {
        alert("error");
      }
    } else {
      const response = await api.post("/reports", report);

      if (response.status === 201) {
        history.goBack();
      } else if (response.status === 400) {
        setMessage(response.message);
      }
    }
  }
  return (
    <>
      <PageHeader />
      <div className="container-center report-form">
        <div className="name-container">
          <strong>Novo Report</strong>
        </div>
        <main className="report-form--container">
          <form onSubmit={handleCreateOrUpdate}>
            <div className="report-form--block">
              <TextInput
                placeholder="Titulo"
                value={title}
                disabled={userId && !(userId === user.id)}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="report-form--block">
              <textarea
                placeholder="Escreva brevemente sobre o que é este report..."
                value={description}
                disabled={userId && !(userId === user.id)}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="report-form--select-group">
              <select required onChange={(e) => setStatus(e.target.value)}>
                <option>Selecione um status</option>
                {StatusReportEnum.map((statusEnum) => (
                  <option
                    key={statusEnum.value}
                    value={statusEnum.value}
                    selected={statusEnum.value === status}
                  >
                    {statusEnum.label}
                  </option>
                ))}
              </select>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option>Selecione uma categoria</option>
                {categorys.map((c) => (
                  <option key={c.id} value={c.id} selected={c.id === category}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {message == null ? "" : <p>{message}</p>}
            <div className="report-form--options">
              <ButtonSubmit color="#00994c" type="submit">
                Salvar
              </ButtonSubmit>
              <Button color="#FF6666" to={`/project/${id}`}>
                Cancelar
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default ReportForm;
