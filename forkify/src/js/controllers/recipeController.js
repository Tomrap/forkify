import * as recipeModel from './../models/recipeModel.js'
import * as recipeView from './../views/recipeView.js'
import * as likesController from './likesController.js'

export {init, ingredients, res, getRecipeDetails}

var ingredients;
var res;

function init() {
    recipeView.initializeRecipeView(getRecipeDetails, servingHandler);
}

async function getRecipeDetails(id) {
    let jsonResult = await getSpecificRecipeDetails(id);
    res = $.extend(new recipeModel.Recipe(), jsonResult.recipe) 
    drawRecipe(res)
    ingredients = splitIngredients(res)
    drawIngredients(ingredients);
}

async function getSpecificRecipeDetails(query) {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${query}`);
    return await response.json();
}

function drawRecipe(recipe) {
    recipeView.updateRecipeTop(recipe);
    recipeView.changeLikesHeart(likesController.checkIfElementIsLiked(recipe))
}

function drawIngredients(ingredients) {
    ingredients.forEach(element => {
        recipeView.addRecipeIngredient(element);
    });
}

function splitIngredients(recipe) {
    return recipe.ingredients.map((element) => {
        return recipeModel.splitIngredient(element);
    })
}

function servingHandler(modifier) {
    if(!(ingredients[0].servingCounter == 1 && modifier == -1)) {
        ingredients.forEach(element => {
            element.servingCounter+=modifier
        });
        recipeView.updateAllRecipeIngredients(ingredients);
        recipeView.updateServings(ingredients[0].servingCounter)
    }
}
