export {initializeRecipeView, addRecipeIngredient, updateRecipe as updateRecipeTop, updateAllRecipeIngredients, updateServings, changeLikesHeart}

function initializeRecipeView(resultListhandler, servingHandler) {    
    document.querySelector('.recipe_container').style.display = "none";
    document.querySelector('.results__list').addEventListener('click', (event) => {
        var itemID = event.toElement.parentNode.parentNode.hash;
        if (itemID) {
            resultListhandler(itemID.substring(1))
        }
    })
    document.querySelector('.recipe__info-buttons').children[0].addEventListener('click', servingHandler.bind(null,-1))
    document.querySelector('.recipe__info-buttons').children[1].addEventListener('click', servingHandler.bind(null,1))
}

function updateRecipe(element) {
    document.querySelector('.recipe_container').style.display = "block";
    document.querySelector('.recipe__img').src = element.image_url;
    document.querySelector('.recipe__title').children[0].innerText = element.title;
    document.querySelector('.recipe__info-data--minutes').innerText = element.time;
    document.querySelector('.recipe__info-data--people').innerText = element.servings;
    document.querySelector('.recipe__directions-text').children[0].innerText = element.publisher;
    document.querySelector('.recipe__directions').children[2].href = element.source_url;
    $('.recipe__ingredient-list').empty();
}

function updateServings(servings) {
    document.querySelector('.recipe__info-data--people').innerText = servings;
}

function addRecipeIngredient(element) {
    let html = `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${element.count*element.servingCounter}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${element.unit}</span>
            ${element.name}
        </div>
    </li>`
    document.querySelector('.recipe__ingredient-list').insertAdjacentHTML('beforeend', html);
}

function updateAllRecipeIngredients(ingredients) {
    let fields = document.querySelectorAll('.recipe__count');
    let fieldsArr = Array.prototype.slice.call(fields);
    fieldsArr.forEach((element, index) => {
        element.innerText = ingredients[index].count*ingredients[index].servingCounter;
    });
}

function changeLikesHeart(isLiked) {
    if(isLiked>=0) {
        document.querySelector('.header__likes').children[0].href.baseVal="img/icons.svg#icon-heart"
    } else {
        document.querySelector('.header__likes').children[0].href.baseVal="img/icons.svg#icon-heart-outlined"
    }
}
