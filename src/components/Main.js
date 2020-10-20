import React from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import profilePencil from '../images/profile-pencil.svg'
import buttonAdd from '../images/button-add.svg'

function Main(props) {
    // const [userProfile, setUserProfile] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        // api.getUserMe()
        //     .then((data) => {
        //         setUserProfile({
        //             userName: data.name,
        //             userDescription: data.about,
        //             userAvatar: data.avatar,
        //         });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        api.getAllCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);

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
        })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={`${currentUser.avatar}`} alt="Аватар"  />
                        <div className="profile__overlay"></div>
                    </button>
                    <div className="profile__info">
                        <div className="profile__info-button">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                                <img className="profile__edit-img" src={profilePencil} alt="Кнопка_редактирования"/>
                            </button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                    <img className="profile__add-img" src={buttonAdd} alt="Кнопка_добавления"/>
                </button>
            </section>

            <section className="elements">
                {cards.map((item) => (
                        <Card {...item} key={item._id}  onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                    ))}
            </section>
        </main>
    );
}

export default Main;