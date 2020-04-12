export {addElementToResultListUI, clearResults, showNextButton, showPrevButton}

function addElementToResultListUI(element) {
    let html = `<li><a class="results__link " href="#${element.recipe_id}"><figure class="results__fig"><img src="${element.image_url}" alt="Test"></figure><div class="results__data"><h4 class="results__name">${element.title}</h4><p class="results__author">${element.publisher}</p></div></a></li>`
    document.querySelector('.results__list').insertAdjacentHTML('beforeend', html);
}

// function initialize(handler) {    
//     hideButtons();
//     document.querySelector('.btn').addEventListener('click', () => {
//         // handler(getSearchQuery());
//         console.log('searchForTheRecipe');
//     })
//     document.querySelector('.search__field').addEventListener("keypress", () => {
//         if (event.keyCode === 13) {
//             handler(getSearchQuery());
//         }
//     });
// }

// function whatever() {    
    // hideButtons();
    // document.querySelector('.btn').addEventListener('click', () => {
    //     // handler(getSearchQuery());
    //     console.log('searchForTheRecipe');
    // })
    // document.querySelector('.search__field').addEventListener("keypress", () => {
    //     if (event.keyCode === 13) {
    //         handler(getSearchQuery());
    //     }
    // });
// }

function getSearchQuery() {
    return document.querySelector('.search__field').value;
}

function clearResults() {
    document.querySelector('.results__list').innerHTML = "";
    hideButtons();
}

function hideButtons() {
    document.querySelector('#next_button').style.display = "none";
    document.querySelector('#prvious_button').style.display = "none";
}

function showNextButton(number, handler) {
    updateButton(number, '#next_button', handler);
}

function showPrevButton(number, handler) {
    updateButton(number, '#prvious_button', handler);
}

function updateButton(number, id, handler) {
    document.querySelector(id).style.display = "block";
    let children = document.querySelector(id).childNodes;
    children[3].textContent = `page ${number}`;
    document.querySelector(id).addEventListener('click', handler);
}
