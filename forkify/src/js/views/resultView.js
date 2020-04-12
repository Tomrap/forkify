
    export function setHandlersForButtons(searchHandler) {    
        hideButtons();
        document.querySelector('.btn').addEventListener('click', () => {
            searchHandler(getSearchQuery());
        })
        document.querySelector('.search__field').addEventListener("keypress", () => {
            if (event.keyCode === 13) {
                searchHandler(getSearchQuery());
            }
        });
    }
    
    //this handler is set (set, not defined) first so it is fired first as well however it calls async method so before async method is run, second handler is run
    export function setHandlersForResultElements(resultElementHandler) {
        document.querySelector('.results__list').addEventListener('click', (event) => {
            var itemID = event.toElement.parentNode.parentNode.hash;
            if (itemID) {
                resultElementHandler(itemID.substring(1))
            }
        })
    }

    export function subsequentSetHandlerForResultElements(resultElementHandler, functionCalcuatingArgument) {
        document.querySelector('.results__list').addEventListener('click', () => {
            resultElementHandler(functionCalcuatingArgument());
        })
    }
    
    export function clearResults() {
        document.querySelector('.results__list').innerHTML = "";
        hideButtons();
    }
    
    export function showNextButton(number, handler) {
        updateButton(number, '#next_button', handler);
    }
    
    export function showPrevButton(number, handler) {
        updateButton(number, '#prvious_button', handler);
    }
    
    export function addElementToResultListUI(element) {
        let html = `<li><a class="results__link " href="#${element.recipe_id}"><figure class="results__fig"><img src="${element.image_url}" alt="Test"></figure><div class="results__data"><h4 class="results__name">${element.title}</h4><p class="results__author">${element.publisher}</p></div></a></li>`
        document.querySelector('.results__list').insertAdjacentHTML('beforeend', html);
    }

    function getSearchQuery() {
        return document.querySelector('.search__field').value;
    }
    
    function hideButtons() {
        document.querySelector('#next_button').style.display = "none";
        document.querySelector('#prvious_button').style.display = "none";
    }

    function updateButton(number, id, handler) {
        document.querySelector(id).style.display = "block";
        let children = document.querySelector(id).childNodes;
        children[3].textContent = `page ${number}`;
        document.querySelector(id).addEventListener('click', handler);
    }


