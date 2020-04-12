export {addLikedElement, initializeLikesView, deleteAllLikedElements}

function initializeLikesView(handler, resultListhandler) {
    document.querySelector('.recipe__love').addEventListener('click', handler);
    document.querySelector('.likes__list').addEventListener('click', (event) => {
        var itemID = event.toElement.parentNode.parentNode.hash;
        if (itemID) {
            resultListhandler(itemID.substring(1))
        }
    })
}

function addLikedElement(element) {
    let html = `
    <li>
        <a class="likes__link" href="#${element.recipe_id}">
            <figure class="likes__fig">
                <img src="${element.image_url}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${element.title}</h4>
                <p class="likes__author">${element.publisher}</p>
            </div>
        </a>
    </li>`
    document.querySelector('.likes__list').insertAdjacentHTML('beforeend', html);          
}

function deleteAllLikedElements() {
    $('.likes__list').empty();       
}

function changeLikesHeart(filled) {
    if(filled) {
        document.querySelector('.header__likes').children[0].href.baseVal="img/icons.svg#icon-heart"
    } else {
        document.querySelector('.header__likes').children[0].href.baseVal="img/icons.svg#icon-heart-outlined"
    }
}