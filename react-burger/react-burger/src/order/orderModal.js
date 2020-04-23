import React, { useContext }  from 'react';
import {FirebaseContext} from '../firebase';

const OrderModal = (props) => {

    const firebaseContext = useContext(FirebaseContext);

    let ingredientList = [];
    let burger = {}
    burger.ingredients = {};

    for (const ingredient in props.currentIngredients) {
        ingredientList.push(
            <li key={ingredient}>{ingredient} {props.currentIngredients[ingredient]}</li>
        )
        burger.ingredients[ingredient] = props.currentIngredients[ingredient];
    }
    burger.price = props.price


    return  (

        <div id="myModal" className="modal">
            <div className="modal-content">
            <span className="close" onClick={props.hideOrder}>&times;</span>
            <p>Yor Order</p>
            <p>Delicious Burger with following ingredients:</p>
            <ul className="main-nav js--main-nav">
                {ingredientList}
            </ul>
            <p>Total Price: {props.price}</p>
            <p>Save to Database?</p>
            <input type="text" id="fname" name="fname" onChange={event => burger.Name = event.target.value}></input>
            <button className="addOrSubButton" onClick={() => {
                firebaseContext.saveToDatabase(burger);
                props.hideOrder();
            }
                }>Save</button>
            <button className="addOrSubButton" onClick={props.hideOrder}>Cancel</button>
            </div>
        </div>
    )
}

export default OrderModal;