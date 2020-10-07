import React from "react";


function ImagePopup() {

    return (
    <div className="modal modal_image-card">
        <div className="modal__container-image">
            <button type="button" className="modal__close-button">
                <img className="modal__close" src="../images/close-icon.svg" alt="Кнопка_выхода"/>
            </button>
            <img className="modal__image-open" alt=""/>
            <h3 className="modal__title-open"></h3>
        </div>
    </div>
    );
}

export default ImagePopup ;