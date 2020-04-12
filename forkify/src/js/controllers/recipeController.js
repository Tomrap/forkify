import * as recipeModel from './../models/recipeModel.js'
import * as recipeView from './../views/recipeView.js'
import * as resultView from './../views/resultView.js'

export default class RecipeController {
    constructor() {
        recipeView.setHandlerForModifyButtons(this.servingHandler.bind(this));
        resultView.setHandlersForResultElements(this.getRecipeDetails.bind(this))
        //just to have them in one place
        this.id
        this.res
        this.ingredients
    }

    async getRecipeDetails(id) {
        this.id = id;
        let jsonResult = await this.getSpecificRecipeDetails(id);
        this.res = $.extend(new recipeModel.Recipe(), jsonResult.recipe) 
        this.drawRecipe(this.res)
        this.ingredients = this.splitIngredients(this.res)
        this.drawIngredients();
    }

    async getSpecificRecipeDetails(query) {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${query}`);
        return await response.json();
    }

    drawRecipe(recipe) {
        recipeView.updateRecipe(recipe);
        // recipeView.changeLikesHeart(likesController.checkIfElementIsLiked(recipe))
    }

    drawIngredients() {
        this.ingredients.forEach(element => {
            recipeView.addRecipeIngredient(element);
        });
    }

    splitIngredients(recipe) {
        return recipe.ingredients.map((element) => {
            return recipe.splitIngredient(element);
        })
    }

    servingHandler(modifier) {
        if(!(this.ingredients[0].servingCounter == 1 && modifier == -1)) {
            this.ingredients.forEach(element => {
                element.servingCounter+=modifier
            });
            recipeView.updateAllRecipeIngredients(this.ingredients);
            recipeView.updateServings(this.ingredients[0].servingCounter)
        }
    }
}



