import React, { useEffect, useState } from "react";
import api from "../../services/api";

import PageHeader from "../../components/PageHeader";

import "./styles.css";

function ReportList({ history }) {
  const [reports, setReports] = useState([]);
  const [orderBy, setOrderBy] = useState("status");

  useEffect(() => {
    async function loadReports() {
      const response = await api.get(`reports/myreports?orderBy=${orderBy}`);

      if (response.status === 200) {
        setReports(response.data);
      } else if (response.status === 400) {
        alert("erro");
      }
    }
    loadReports();
  }, [orderBy]);

  const showReport = (projectId, reportId) => {
    history.push(`/project/${projectId}/report/${reportId}`);
  };

  return (
    <>
      <PageHeader />
      <div className="container-center project-list">
        <div className="owner-project-list">
          <div className="title-container">
            <strong>Meus Reports</strong>
            <div className="title-options">
              <select onChange={(e) => setOrderBy(e.target.value)}>
                <option value="status">Ordenar por Status</option>
                <option value="title">Ordenar por Titulo</option>
                <option value="createdAt">Ordenar por Data de Criação</option>
              </select>
            </div>
          </div>
          <main className="project-list--cards-container">
            {reports.length >= 1 ? (
              reports.map((report) => (
                <article
                  key={report.id}
                  className="project-list--card"
                  onClick={() => showReport(report.projectId, report.id)}
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
              ))
            ) : (
              <div>
                <p className="my-projects-message">
                  Você não está possui/participa de nenhum report.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default ReportList;
