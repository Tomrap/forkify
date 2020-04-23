import React from 'react';
import IngredientsContext from '../context/ingredients-context'


const IngredientElement =   (props) => {

    return  (
        <IngredientsContext.Consumer> 
        {context =>
               <div className="rowOfElements">
                <div className="text">{props.name}</div>
                <div className="text">{props.value}</div>
                <button className="addOrSubButton" onClick={() => context.increaseIngredient(props.name)}>ADD</button>
                <button className="addOrSubButton" onClick={() => context.lowerIngredient(props.name)}>SUB</button>
              </div>
        }
        </IngredientsContext.Consumer>
    )
}

export default IngredientElement;