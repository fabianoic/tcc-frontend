import React from "react";

import "./styles.css";
import close from "../../assets/images/close.svg";


export default ({visible, setVisible, onConfirm, title, body, data}) => {

    const handleConfirm = () => {
        onConfirm(data);
        setVisible(false);
    }

    return visible ? (
            <div className="modal-container">
              <div className="modal">
                <div className="modal-header">
                    <h3>{title}</h3>
                  <img
                    src={close}
                    alt="Close"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div className="modal-body">
                  {body}
                </div>
                <div className="modal-footer">
                  <button
                    className="confirm"
                    onClick={handleConfirm}>
                    Confirmar
                  </button>
                  <button className="cancel" onClick={() => setVisible(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ) : (<></>)
    
}
    
