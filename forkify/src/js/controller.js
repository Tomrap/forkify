import ResultController from './controllers/resultController.js'
import RecipeController from './controllers/recipeController.js'
import ShoppingController from './controllers/shoppingController.js'
import LikesController from './controllers/likesController.js'

var GlobalResultController = new ResultController()
var GlobalRecipeController = new RecipeController()
var GlobalShoppingController = new ShoppingController(GlobalRecipeController)
var GlobalLikesController = new LikesController(GlobalRecipeController)




