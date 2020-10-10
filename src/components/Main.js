import React from "react";
import api from "./Api";
import Card from "./Card";
import profilePencil from '../images/profile-pencil.svg'
import buttonAdd from '../images/button-add.svg'

function Main(props) {
    const [userProfile, setUserProfile] = React.useState([]);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserMe().then((data) => {
            setUserProfile({
                userName: data.name,
                userDescription: data.about,
                userAvatar: data.avatar,
            });
        });

        api.getAllCards().then((data) => {
            setCards(data);
        });
    },[]);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={`${userProfile.userAvatar}`} alt="Аватар"  />
                        <div className="profile__overlay"></div>
                    </button>
                    <div className="profile__info">
                        <div className="profile__info-button">
                            <h1 className="profile__title">{userProfile.userName}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                                <img className="profile__edit-img" src={profilePencil} alt="Кнопка_редактирования"/>
                            </button>
                        </div>
                        <p className="profile__subtitle">{userProfile.userDescription}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                    <img className="profile__add-img" src={buttonAdd} alt="Кнопка_добавления"/>
                </button>
            </section>

            <section className="elements">
                {cards.map(({_id, ...item}) => (
                        <Card key={_id} {...item}  onCardClick={props.onCardClick}/>
                    ))}
            </section>
        </main>
    );
}

export default Main;