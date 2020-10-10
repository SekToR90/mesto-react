import React from "react";

function Card({name, link, likes, onCardClick}) {

    function handleClick() {
         onCardClick({name, link});
    }

    return (
        <div className="element">
            <button type="button" className="element__delete"></button>
            <img className="element__img" src={`${link}`} alt={`${name}`} onClick={handleClick} />
            <div className="element__group">
                <h2 className="element__title">{name}</h2>
                <div>
                    <button type="button" className="element__like"></button>
                    <h3 className="element__like_title">{likes.length}</h3>
                </div>
            </div>
        </div>
    );
}

export default Card ;