import React from "react";

interface CardPriceProps {
    price: number;
    discount?: number;
}

const CardPrice: React.FC<CardPriceProps> = ({ price, discount }) => {
    return <h5 className="card-price">
        <span className={`price-original${discount ? ' price-original--cross-through' : null}`}>
            ${price}
        </span>
        {discount
            ? <span> ${((price) * ((100 - discount) / 100)).toFixed(2)}<br /><small>with subscription</small></span>
            : null}
    </h5>
};

export default CardPrice;


