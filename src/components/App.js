import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup'
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";



function App() {
  // Переменные, отвечающие за видимость модалок
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({
      name: '',
      about: '',
      avatar: '#'
  });
  //

  React.useEffect(() => {
    api.getUserMe()
        .then((data) => {
            setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
  },[]);

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

  const userInfo = (data) => {
      setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
          _id: data._id
      });
  }

  const handleUpdateUser = (value) => {
    api.patchUsersMe(value)
        .then((data) => {
            userInfo(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
  }

    const  handleUpdateAvatar = (value) => {
        api.patchUsersAvatar(value)
            .then((data) => {
                userInfo(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
              <div className="page__container">
                  <Header />
                  <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
                  <Footer />
              </div>
              <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose ={closeAllPopups}/>

              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

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

              <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" />

          </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
