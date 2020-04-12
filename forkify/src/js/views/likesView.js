
export function setHandlerForLikesList(likesListElementHandler, fillTheHeartHandler) {
    document.querySelector('.likes__list').addEventListener('click', (event) => {
        var itemID = event.toElement.parentNode.parentNode.hash;
        if (itemID) {
            fillTheHeartHandler();
            likesListElementHandler(itemID.substring(1))
        }
    })
}

export function addLikedElement(element) {
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

export function deleteAllLikedElements() {
    $('.likes__list').empty();       
}
