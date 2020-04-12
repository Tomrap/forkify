import * as likesView from './../views/likesView.js'
import * as recipeView from './../views/recipeView.js'
import * as resultView from './../views/resultView.js'

export default class LikesController {
    constructor(recipeController) {
        this.recipeListObject = [];
        this.recipeController = recipeController;
        //this piece of code is a bit complicated, could be fix a bit by removing "like heart" fill in logic (if else) from view to here
        //it is complicated because there need to be 2 handlers: one to draw recipe object, another one to check if the heart should be filled in (liked) or not
        likesView.setHandlerForLikesList(recipeController.getRecipeDetails.bind(recipeController),recipeView.changeLikesHeart.bind(null, 0));
        recipeView.setHandlerForRecipeLove(this.servingHandler.bind(this))
        resultView.subsequentSetHandlerForResultElements(recipeView.changeLikesHeart, this.checkIfElementIsLiked.bind(this));
        this.readFromLocalStorage()
        this.reDrawLikedElements();
    }

    servingHandler() {
        let index = this.checkIfElementIsLiked(this.recipeController.res.recipe_id)
        if(index == -1) {
            this.recipeListObject.push(this.recipeController.res);
            this.reDrawLikedElements()
            recipeView.changeLikesHeart(0)
        } else {
            this.recipeListObject.splice(index, 1);  
            this.reDrawLikedElements()
            recipeView.changeLikesHeart(-1)
        }
        this.saveToLocalStorage();
    }
    
    reDrawLikedElements() {
        likesView.deleteAllLikedElements()
        for (let index = 0; index < this.recipeListObject.length; index++) {
            likesView.addLikedElement(this.recipeListObject[index])
        }
    }
    
    checkIfElementIsLiked(recipe_id) {
        for (let index = 0; index < this.recipeListObject.length; index++) {
            if(this.recipeListObject[index].recipe_id == recipe_id) {
                return index;
            } 
        }
        return -1;
    }
    
    saveToLocalStorage() {
        let likesList  = [];
        this.recipeListObject.forEach(element => {     
            likesList.push(JSON.stringify(element))
        });
        window.localStorage.setItem('likes', JSON.stringify(likesList));
    }
    
    readFromLocalStorage() {
        let likesList = JSON.parse(window.localStorage.getItem('likes'))
        if(likesList != null) {
            likesList.forEach(element => {     
                this.recipeListObject.push(JSON.parse(element))
            });
        }
    }
}

