import React , {Component} from 'react';

import BurgerImage from './burger/BurgerImage'
import IgredientList from './burger/IngredientList'
import IngredientsContext from './context/ingredients-context'
import OrderController from './order/OrderController'
import BurgerInitialization from './BurgerInitialization'

class BurgerController extends Component {

    ingredientsMap = BurgerInitialization.ingredientsMap;

    state = {
        currentIngredients: (()=>{
            let ingredients = {};
            this.ingredientsMap.forEach((value,key) => {
                ingredients[key] = 0;
            });
            return ingredients;
        })(),   
        price: 0,
    }   
    
    increaseIngredient = (ingredientName) => {
        this.setState((prevState) => {
            if(this.getTotalCount.call(prevState)<6) {
                let newIngredients = {...prevState.currentIngredients}
                let number = newIngredients[ingredientName]
                number++;
                newIngredients[ingredientName] = number
                return {
                    currentIngredients: newIngredients,
                    price: prevState.price + this.ingredientsMap.get(ingredientName).price
                }
            }
        })  
    }

    lowerIngredient = (ingredientName) => {
        this.setState((prevState) => {
            let newIngredients = {...prevState.currentIngredients}
            let number = newIngredients[ingredientName]
            if(number>0) {
                number--;
                newIngredients[ingredientName] = number
                return {
                    currentIngredients: newIngredients,
                    price: prevState.price - this.ingredientsMap.get(ingredientName).price
                }
            }
        })
    }

    getTotalCount() {
        let totatCount = 0;
        for (const ingredient in this.currentIngredients) {
            totatCount+=this.currentIngredients[ingredient];
        }
        return totatCount;
    }

    render() {
            return (
            <div className="Burger">
              <BurgerImage currentIngredients={this.state.currentIngredients}></BurgerImage>
              <div className="burgerCreationContainer">
                  <div className="price">Current Price: {this.state.price}</div>
                  <IngredientsContext.Provider value ={{
                      increaseIngredient: this.increaseIngredient,
                      lowerIngredient: this.lowerIngredient
                  }}>
                    <IgredientList currentIngredients = {this.state.currentIngredients}></IgredientList>
                  </IngredientsContext.Provider>
                    <OrderController currentIngredients = {this.state.currentIngredients} price={this.state.price}></OrderController>
              </div>
            </div> 
        )
    }
}        

export default BurgerController;