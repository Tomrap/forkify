export class Recipe {
    constructor(publisher,title,source_url,image_url,recipe_id,ingredients) {
        this.publisher = publisher;
        this.title = title;
        this.source_url = source_url;
        this.recipe_id = recipe_id;
        this.image_url = image_url;
        this.ingredients = ingredients;
        //hardcoded
        this.servings = 1;
        this.time = Math.floor(Math.random()*30) + 15;
    }

    splitIngredient(ingredient) {
        //TODO fix e.g. "Semolina flour OR cornmeal for dusting" or "1 3/4 cups (14 ounces) water, ice cold (40F)"
        let firstIndexToSplit = ingredient.indexOf(' ');
        let splited1 = [ingredient.slice(0, firstIndexToSplit), ingredient.slice(firstIndexToSplit+1)]
        let count = splited1[0];
        let secondIndexToSplit = (splited1[1].charAt(splited1[1].indexOf(' ') + 1) == '(') ? splited1[1].indexOf(')') + 1 : splited1[1].indexOf(' ')
        let splited2 = [splited1[1].slice(0, secondIndexToSplit), splited1[1].slice(secondIndexToSplit+1)]
        let unit = splited2[0];
        let name = splited2[1];
        return new Ingredient(count, unit, name);
    };
}

export class Ingredient {
    constructor(count, unit,  name) {
        this.count = count;
        this.unit = unit;
        this.name = name;
        this.servingCounter = 1;
    }
}

