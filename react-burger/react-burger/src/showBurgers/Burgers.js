import React from 'react';
import BurgerImage from '../burger/BurgerImage'

const Burgers = (props) => {

    let burgers = []; 

    props.burgerList.forEach(element => {   
        burgers.push(<BurgerImage currentIngredients={element} ></BurgerImage>)
    });

    return  (
        <div>
            {burgers}
        </div>
    )
}

export default Burgers;