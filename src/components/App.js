import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup'
import '../index.css';

function App() {

  function  handleEditAvatarClick () {
    const userAvatar = document.querySelector('.modal_edit-avatar');
    userAvatar.classList.add('modal_open');
  }

  function handleEditProfileClick() {
    const editProfile = document.querySelector('.modal_edit-profile');
    editProfile.classList.add('modal_open');
  }

  function handleAddPlaceClick () {
    const addCard = document.querySelector('.modal_add-card');
    addCard.classList.add('modal_open');
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main />
        <Footer />

        <div className="modal modal_edit-profile">
          <div className="modal__container">
            <button type="button" className="modal__close-button">
              <img className="modal__close" src="../images/close-icon.svg" alt="Кнопка_выхода"/>
            </button>
            <h2 className="modal__title">Редактировать профиль</h2>
            <form action="#" name="form" className="modal__field" noValidate>

              <input type="text" name="name" className="modal__input modal__input_name" value="Жак-Ив Кусто"
                     placeholder="Имя" required minLength="2" maxLength="40" autoComplete="off"/>
                <span className="modal__error" id="name-error"></span>

                <input type="text" name="aboutMe" className="modal__input modal__input_about-me"
                       value="Исследователь океана" placeholder="О себе" required minLength="2" maxLength="200"
                       autoComplete="off"/>
                  <span className="modal__error" id="aboutMe-error"></span>

                  <button type="submit" className="modal__button-save modal__button-save_disabled" disabled>Сохранить
                  </button>
            </form>
          </div>
        </div>
      </div>

      <div className="modal modal_add-card">
        <div className="modal__container">
          <button type="button" className="modal__close-button">
            <img className="modal__close" src="../images/close-icon.svg" alt="Кнопка_выхода"/>
          </button>
          <h2 className="modal__title">Новое место</h2>
          <form action="#" name="form" className="modal__field" noValidate>

            <input type="text" name="plase" className="modal__input modal__input_plase" placeholder="Название" required
                   minLength="1" maxLength="30" autoComplete="off"/>
              <span className="modal__error" id="plase-error"></span>

              <input type="url" name="url" className="modal__input modal__input_link" placeholder="Ссылка на картинку"
                     required autoComplete="off"/>
                <span className="modal__error" id="url-error"></span>

                <button type="submit" className="modal__button-save modal__button-save_disabled" disabled>Создать
                </button>
          </form>
        </div>
      </div>

      <ImagePopup />

      <div className="modal modal_delete-card">
        <div className="modal__container">
          <button type="button" className="modal__close-button">
            <img className="modal__close" src="../images/close-icon.svg" alt="Кнопка_выхода"/>
          </button>
          <h2 className="modal__title">Вы уверены?</h2>
          <form action="#" name="form" className="modal__field" noValidate>
            <button type="submit" className="modal__button-save">Да</button>
          </form>
        </div>
      </div>

      <div className="modal modal_edit-avatar">
        <div className="modal__container">
          <button type="button" className="modal__close-button">
            <img className="modal__close" src="../images/close-icon.svg" alt="Кнопка_выхода"/>
          </button>
          <h2 className="modal__title">Обновить аватар</h2>
          <form action="#" name="form" className="modal__field" noValidate>

            <input type="url" name="urlAvatar" className="modal__input modal__input_link-avatar"
                   placeholder="Ссылка на картинку" required autoComplete="off"/>
              <span className="modal__error" id="urlAvatar-error"></span>

              <button type="submit" className="modal__button-save modal__button-save_disabled" disabled>Сохранить
              </button>
          </form>
        </div>
      </div>

      <template className="elements-card">
        <div className="element">
          <button type="button" className="element__delete"></button>
          <img className="element__img" alt=""/>
            <div className="element__group">
              <h2 className="element__title"></h2>
              <div>
                <button type="button" className="element__like"></button>
                <h3 className="element__like_title"></h3>
              </div>
            </div>
        </div>
      </template>
    </div>
  );
}

export default App;
