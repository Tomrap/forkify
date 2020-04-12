import * as resultModel from './../models/resultModel.js'
import * as resultView from './../views/resultView.js'

export {init}

function init() {
    resultView.initializeResultView(searchForTheRecipe);
}

async function searchForTheRecipe(query) {
    let resultListObject = new resultModel.RecipeListObject();
    resultListObject.resultList.length = 0;
    await populateResultList(query,resultListObject)
    drawResults(resultListObject.getAllResults(),0);
}

async function populateResultList(query, resultListObject) {
    let jsonResult = await getAll(query);
    jsonResult.recipes.forEach(element => {
        let res = $.extend(new resultModel.Result(), element) 
        resultListObject.addResult(res)
    });
}

async function getAll(query) {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        return await response.json();
}

function drawResults(resultList, pageNumber) {
    resultView.clearResults()
    let elementsPerPage = 10;
    let firstIndex = pageNumber*elementsPerPage;
    let length = resultList.length
    if(length > firstIndex) {
        let lastIndex = length<(firstIndex + elementsPerPage) ? length : firstIndex + elementsPerPage;
        updateResultListUI(resultList, firstIndex, lastIndex);
        drawButtons(resultList, pageNumber, elementsPerPage)
    }    
}

function updateResultListUI(resultList, startIndex, endIndex) {
    for (let index = startIndex; index < endIndex; index++) {
        resultView.addElementToResultListUI(resultList[index]);
    }
}

function drawButtons(resultList, pageNumber, elementsPerPage) {
    if(pageNumber > 0) {
        resultView.showPrevButton(pageNumber, () => {
            drawResults(resultList,pageNumber-1);    
        });
    }
    if(resultList.length>(pageNumber*elementsPerPage + elementsPerPage)) {
        resultView.showNextButton(pageNumber+2, () => {
            drawResults(resultList,pageNumber+1);   
        });
    }
}