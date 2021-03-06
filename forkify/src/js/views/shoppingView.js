export function setHandlerForShoppingListItems() {
    document.querySelector('.shopping__list').addEventListener('click', (event) => {
        var item = event.toElement.parentNode.parentNode;
        if (item) {
            item.remove();
        }
    })
}

export function addShoppingItem(element) {
    let html = `<li class="shopping__item">
                    <div class="shopping__count">
                        <input type="number" value="${element.count}" step="100">
                        <p>${element.unit}</p>
                    </div>
                    <p class="shopping__description">${element.name}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`
    document.querySelector('.shopping__list').insertAdjacentHTML('beforeend', html);          
}

export function clearShoppingList() {
    $('.shopping__list').empty();
}