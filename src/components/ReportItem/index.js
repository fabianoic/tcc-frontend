import React from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { history } from "../../helpers/history";

import Delete from "../../assets/images/delete.png";
import Editar from "../../assets/images/editar.png";

import "./styles.css";

function ReportItem({ report, setExcluido }) {
  async function handleDelet(e) {
    e.preventDefault();
    const response = await api.delete(`/reports/${report.id}`);

    if (response.status === 204) {
      setExcluido(true);
    } else if (response.status === 404) {
      alert(response.data.message);
    }
  }

  return (
    <li className="report-item">
      <header>
        <div className="report-info">
          <div className="report-info-options">
            <Link
              to={`${report.project.id}/report/${report.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {report.title}{" "}
            </Link>
            <button
              onClick={() => {
                history.push(``);
              }}
            >
              <img src={Editar} alt="editar report" />
            </button>
            <button onClick={handleDelet}>
              <img src={Delete} alt="deletar report" />
            </button>
          </div>
          <p className={`report-status-${report.status.replace(" ", "-")}`}>
            {report.status}
          </p>
          <span>{report.category.name}</span>
        </div>
      </header>
      <p>{report.description}</p>
      <p className="autor-info">Autor: {report.user.nickname}</p>
    </li>
  );
}

export default ReportItem;
