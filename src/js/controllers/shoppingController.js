import * as shoppingView from './../views/shoppingView.js'
import * as recipeController from './recipeController.js'

export {init}


function init() {
    shoppingView.clearShoppingList()
    shoppingView.initializeShoppingView(servingHandler);
}

function servingHandler() {
    shoppingView.clearShoppingList()
    recipeController.ingredients.forEach(element => {
            shoppingView.addShoppingItem(element);
        });
}