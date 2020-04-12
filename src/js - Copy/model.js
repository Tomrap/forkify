export {ResultListObject, Result};

class ResultListObject {
    constructor() {
        this.resultList = [];
    }
    
    addResult(result) {
        this.resultList.push(result);
    }
    
    getAllResults() {
        return this.resultList;
    }
}

class Result {
    constructor(publisher, title, source_url,recipe_id,image_url,social_rank,publisher_url) {
        this.publisher = publisher;
        this.title = title;
        this.source_url = source_url;
        this.recipe_id = recipe_id;
        this.image_url = image_url;
        this.social_rank = social_rank;
        this.publisher_url = publisher_url;
    }
}
