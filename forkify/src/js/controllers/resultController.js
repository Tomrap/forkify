import * as recipeModel from './../models/recipeModel.js'
import * as resultView from './../views/resultView.js'

export default class ResultController {
    constructor() {
        resultView.setHandlersForButtons(this.searchForTheRecipe.bind(this));
    }

    async searchForTheRecipe(query) {
        let resultList = []
        resultList.length = 0;
        await this.populateResultList(query,resultList)
        this.drawResults(resultList,0);
    }
    
    async populateResultList(query, resultList) {
        let jsonResult = await this.getAll(query);
        jsonResult.recipes.forEach(element => {
            let res = $.extend(new recipeModel.Recipe(), element) 
            resultList.push(res)
        });
    }
    
    async getAll(query) {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
            return await response.json();
    }
    
    drawResults(resultList, pageNumber) {
        resultView.clearResults()
        let elementsPerPage = 10;
        let firstIndex = pageNumber*elementsPerPage;
        let length = resultList.length
        if(length > firstIndex) {
            let lastIndex = length<(firstIndex + elementsPerPage) ? length : firstIndex + elementsPerPage;
            this.updateResultListUI(resultList, firstIndex, lastIndex);
            this.drawButtons(resultList, pageNumber, elementsPerPage)
        }    
    }
    
    updateResultListUI(resultList, startIndex, endIndex) {
        for (let index = startIndex; index < endIndex; index++) {
            resultView.addElementToResultListUI(resultList[index]);
        }
    }
    
    drawButtons(resultList, pageNumber, elementsPerPage) {
        if(pageNumber > 0) {
            resultView.showPrevButton(pageNumber, () => {
                this.drawResults(resultList,pageNumber-1);    
            });
        }
        if(resultList.length>(pageNumber*elementsPerPage + elementsPerPage)) {
            resultView.showNextButton(pageNumber+2, () => {
                this.drawResults(resultList,pageNumber+1);   
            });
        }
    }
}


