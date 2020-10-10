import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup'
import PopupWithForm from "./PopupWithForm";
import '../index.css';


function App() {
  // Переменные, отвечающие за видимость модалок
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});


  //

  //Обработчики событий, открывающие модалки
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }
  //

  //Обработчик событий, закрывающий все модалки
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }
  //

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose ={closeAllPopups}/>
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen ? 'modal_open' : ''} onClose ={closeAllPopups} children={
          <>
          <input type="text" name="name" className="modal__input modal__input_name" value=""
                 placeholder="Имя" required minLength="2" maxLength="40" autoComplete="off"/>
          <span className="modal__error" id="name-error"></span>

          <input type="text" name="aboutMe" className="modal__input modal__input_about-me"
          value="" placeholder="О себе" required minLength="2" maxLength="200"
          autoComplete="off"/>
          <span className="modal__error" id="aboutMe-error"></span>
          </>
          }
        />

      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen ? 'modal_open' : ''} onClose ={closeAllPopups} children={
        <>
          <input type="text" name="plase" className="modal__input modal__input_plase" placeholder="Название" required
                 minLength="1" maxLength="30" autoComplete="off"/>
          <span className="modal__error" id="plase-error"></span>

          <input type="url" name="url" className="modal__input modal__input_link" placeholder="Ссылка на картинку"
                 required autoComplete="off"/>
          <span className="modal__error" id="url-error"></span>
        </>
      }
      />

      <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen ? 'modal_open' : ''} onClose ={closeAllPopups} children={
        <>
          <input type="url" name="urlAvatar" className="modal__input modal__input_link-avatar"
                 placeholder="Ссылка на картинку" required autoComplete="off"/>
          <span className="modal__error" id="urlAvatar-error"></span>
        </>
      }
      />


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



      {/*<template className="elements-card">*/}

      {/*</template>*/}
    </div>
  );
}

export default App;
