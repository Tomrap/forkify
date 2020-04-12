import * as model from './model.js'
import * as view from './view.js'

async function searchForTheRecipe(resultListObject, query) {
    console.log('searchForTheRecipe');
    // await populateResultList(query,resultListObject)
    // drawResults(resultListObject.getAllResults(),0);
}

async function getAll(query) {

        const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        return await response.json();
}

async function populateResultList(query, resultListObject) {
    let jsonResult = await getAll(query);
    jsonResult.recipes.forEach(element => {
        let res = $.extend(new model.Result(), element) 
        resultListObject.addResult(res)
    });
}

function updateResultListUI(resultList, startIndex, endIndex) {
    for (let index = startIndex; index < endIndex; index++) {
        view.addElementToResultListUI(resultList[index]);
    }
}

function drawResults(resultList, pageNumber) {
    view.clearResults()
    let elementsPerPage = 10;
    let firstIndex = pageNumber*elementsPerPage;
    let length = resultList.length
    if(length > firstIndex) {
        let lastIndex = length<(firstIndex + elementsPerPage) ? length : firstIndex + elementsPerPage;
        updateResultListUI(resultList, firstIndex, lastIndex);
        drawButtons(resultList, pageNumber, elementsPerPage)
    }    
}

function drawButtons(resultList, pageNumber, elementsPerPage) {
    if(pageNumber > 0) {
        view.showPrevButton(pageNumber, () => {
            drawResults(resultList,pageNumber-1);    
        });
    }
    if(resultList.length>(pageNumber*elementsPerPage + elementsPerPage)) {
        view.showNextButton(pageNumber+2, () => {
            drawResults(resultList,pageNumber+1);   
        });
    }
}
// let resultListObject = new model.ResultListObject();
// view.init(searchForTheRecipe.bind(null,resultListObject));
// view.initialize();
// console.log('here')

// populateResultList('pizza',resultListObject).then(() => {
//     drawResults(resultListObject.getAllResults(),2);
// })


