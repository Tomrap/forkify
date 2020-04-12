import * as shoppingView from './../views/shoppingView.js'
import * as recipeView from './../views/recipeView.js'

export default class ShoppingController{
    constructor(recipeController) {
        this.recipeController = recipeController;
        shoppingView.clearShoppingList()
        shoppingView.setHandlerForShoppingListItems();
        recipeView.setHandlerForAddToShoppingList(this.servingHandler.bind(this));  
    }

    servingHandler() {
        shoppingView.clearShoppingList()
        this.recipeController.ingredients.forEach(element => {
                shoppingView.addShoppingItem(element);
            });
    }
}



    