import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup'
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";


function App() {
    // Переменные, отвечающие за видимость модалок
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isDeleteCardPopup, setDeleteCardPopup] = React.useState(false);
    const [cardId, setCardId] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setCurrentUser] = React.useState({
        name: '',
        about: '',
        avatar: ''
    });
    const [cards, setCards] = React.useState([]);
    //

    React.useEffect(() => {
        api.getUserMe()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
        api.getAllCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleCardLike({_id, likes}) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(_id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === _id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(_id) {
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCards(_id).then(() => {
            // Формируем новый массив на основе имеющегося, удаляя из него выбранную карточку
            const cardsDelete = cards.filter((c) => c._id !== _id);
            // Обновляем стейт
            setCards(cardsDelete);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(err);
            });
    }

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

    const DeleteCard = (_id) => {
        setDeleteCardPopup(true);
        setCardId(_id)
    }
    //

    //Обработчик событий, закрывающий все модалки
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setDeleteCardPopup(false);
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

    const handleUpdateAvatar = (value) => {
        api.patchUsersAvatar(value)
            .then((data) => {
                userInfo(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleAddPlaceSubmit = (value) => {
        api.postAddCard(value)
            .then((data) => {
                const newCard = {
                    name: data.name,
                    link: data.link,
                    _id: data._id,
                    likes: data.likes,
                    owner: data.owner
                }
                closeAllPopups();
                setCards([newCard, ...cards]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header/>
                    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
                          onCardLike={handleCardLike} onCardDelete={DeleteCard}/>
                    <Footer/>
                </div>
                <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

                <DeleteCardPopup isOpen={isDeleteCardPopup} onClose={closeAllPopups} cardId={cardId} handleCardDelete={handleCardDelete}/>

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
