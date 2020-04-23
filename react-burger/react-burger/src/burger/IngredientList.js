import React from 'react';
import IngredientElement from './IngredientElement'

const IngredientList = (props) => {

    let IngredientElementList = [];

    for (const ingredient in props.currentIngredients) {
        IngredientElementList.push(
            <IngredientElement key={ingredient} name = {ingredient} value={props.currentIngredients[ingredient]}></IngredientElement>
        )
    }


    return  (
        <div className="ingredientList">
            {IngredientElementList}
        </div>
    )
}

export default IngredientList;