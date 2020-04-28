import React , {Component} from 'react';

import BurgerImage from './burger/BurgerImage'
import IgredientList from './burger/IngredientList'
import IngredientsContext from './context/ingredients-context'
import OrderModal from './order/OrderModal'
import BurgerInitialization from './BurgerInitialization'
import TextField from '@material-ui/core/TextField';
import { textAlign } from '@material-ui/system';


var textField = {
    paddingBottom: "10px", 
    paddingTop: "10px"
}

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
        name: "My Burger",
        price: 0,
    }   

    initialState = this.state;

    refresh = () => {
        this.setState(this.initialState);
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
                  <TextField defaultValue="My Burger" style={textField} inputStyle={{ textAlign: 'center' }} onChange={event => this.setState({name: event.target.value})}></TextField>
                  <div style={{paddingBottom: "10px", paddingTop: "10px"}}>Current Price: {this.state.price}</div>
                  <IngredientsContext.Provider value ={{
                      increaseIngredient: this.increaseIngredient,
                      lowerIngredient: this.lowerIngredient
                  }}>
                    <IgredientList currentIngredients = {this.state.currentIngredients}></IgredientList>
                  </IngredientsContext.Provider>
                    <OrderModal  name = {this.state.name} refresh = {this.refresh} currentIngredients = {this.state.currentIngredients} price={this.state.price}></OrderModal>
              </div>
            </div> 
        )
    }
}        
export default BurgerController;