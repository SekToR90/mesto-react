import React from "react";

function Main(props) {



    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <button type="button" className="profile__edit-avatar" onClick={handleEditAvatarClick}>
                        <img className="profile__avatar" src="#" alt="Аватар"/>
                        <div className="profile__overlay"></div>
                    </button>
                    <div className="profile__info">
                        <div className="profile__info-button">
                            <h1 className="profile__title">Жак-Ив Кусто</h1>
                            <button type="button" className="profile__edit-button" onClick={handleEditProfileClick}>
                                <img className="profile__edit-img" src="../images/profile-pencil.svg" alt="Кнопка_редактирования"/>
                            </button>
                        </div>
                        <p className="profile__subtitle">Исследователь океана</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}>
                    <img className="profile__add-img" src="../images/button-add.svg" alt="Кнопка_добавления"/>
                </button>
            </section>

            <section className="elements">
            </section>
        </main>
    );
}

export default Main;