import React from 'react';
import { Link } from "react-router-dom";

import "../ProjectItem/styles.css"; 

function ProjectItem({ history, project }){
  return (
  <li className="project-item">
    <header>
      <div className="project-info">
        <Link to={`project/${project.id}`} style={{textDecoration: "none", color: "black"}}>{project.name}</Link>
      </div>
    </header>          
    <p>{project.description.length > 100 ? project.description.substring(0, 50) + "..." : project.description}</p>
  </li>
  );
}

export default ProjectItem;