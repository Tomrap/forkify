import Salad from './resources/img/salad.png'
import Cheese from './resources/img/cheese.png'
import Meat from './resources/img/meat.jpg'

class BurgerInitialization {

    static ingredientsMap = (()=>{
        let map = new Map();
        map.set("salad", {imageSrc: Salad, price: 0.50})
        map.set("meat", {imageSrc: Meat, price: 2.50})
        map.set("cheese", {imageSrc: Cheese, price: 1.00})
        return map;
    })()
}        

export default BurgerInitialization;     