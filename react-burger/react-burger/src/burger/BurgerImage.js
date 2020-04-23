import React from 'react';

import top from './../resources/img/top.jpg'
import bottom from './../resources/img/bottom.png'

import BurgerInitialization from '../BurgerInitialization'

const BurgerImage = (props) => {

    let ingredients = [];

    for (const ingredient in props.currentIngredients) {
      for(let i = 0; i<props.currentIngredients[ingredient]; i++) {  
        ingredients.push(<img src={BurgerInitialization.ingredientsMap.get(ingredient).imageSrc} alt="burgerDrawng" className="bugerDrawing"></img>)
      }
    }

    if(ingredients.length == 0) {
      ingredients.push(<p>Start adding ingredients</p>)
    }
    
    return  (
      <div className="burgerContainer">
        <img src={top} alt="burgerDrawng"></img>
        {ingredients}   
        <img src={bottom} className="bottomBun" alt="burgerDrawng"></img>
      </div>
    )
}

export default BurgerImage;