import React from "react";

function PopupWithForm (props) {

    return (
        <div className={`modal modal_${props.name}`}>
            <div className="modal__container">
                <button type="button" className="modal__close-button">
                    <img className="modal__close" src="../images/close-icon.svg" alt="Кнопка_выхода"/>
                </button>
                <h2 className="modal__title">{props.title}</h2>
                <form action="#" name={props.name} className="modal__field" noValidate>
                    {props.children}
                    <button type="submit" className="modal__button-save modal__button-save_disabled" disabled>Сохранить
                    </button>
                </form>
            </div>
        </div>
    );
}


export default PopupWithForm ;