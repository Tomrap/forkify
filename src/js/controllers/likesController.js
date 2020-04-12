import * as likesView from './../views/likesView.js'
import * as recipeView from './../views/recipeView.js'
import * as recipeController from './recipeController.js'

export {init, checkIfElementIsLiked}

var recipeListObject = [];


function init() {
    readFromLocalStorage()
    reDrawLikedElements();
    likesView.initializeLikesView(servingHandler, recipeController.getRecipeDetails);
}

function servingHandler() {
    let index = checkIfElementIsLiked(recipeController.res)
    if(index == -1) {
        recipeListObject.push(recipeController.res);
        reDrawLikedElements()
        recipeView.changeLikesHeart(0)
    } else {
        recipeListObject.splice(index, 1);
        reDrawLikedElements()
        recipeView.changeLikesHeart(-1)
    }
    saveToLocalStorage();
}

function reDrawLikedElements() {
    likesView.deleteAllLikedElements()
    for (let index = 0; index < recipeListObject.length; index++) {
        likesView.addLikedElement(recipeListObject[index])
    }
}

function checkIfElementIsLiked(res) {

    for (let index = 0; index < recipeListObject.length; index++) {
        if(recipeListObject[index].recipe_id == res.recipe_id) {
            return index;
        } 
    }
    return -1;
}

function saveToLocalStorage() {
    let likesList  = [];
    recipeListObject.forEach(element => {     
        likesList.push(JSON.stringify(element))
    });
    window.localStorage.setItem('likes', JSON.stringify(likesList));
}

function readFromLocalStorage() {
    let likesList = JSON.parse(window.localStorage.getItem('likes'))
    if(likesList != null) {
        likesList.forEach(element => {     
            recipeListObject.push(JSON.parse(element))
        });
    }
}