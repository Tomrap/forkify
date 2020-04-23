import React from 'react';
import BurgerImage from '../burger/BurgerImage'

const Burgers = (props) => {

    let burgers = [];   

    props.burgerList.sort((a,b) => {
        if(a.Name>b.Name) {
            return 1;
        }
        if(a.Name<b.Name) {
            return -1;
        }
        return 0;
    })

    props.burgerList.forEach(element => {   
        burgers.push(<p className="burgerName">{element.Name}</p>)
        burgers.push(<BurgerImage currentIngredients={element.ingredients} ></BurgerImage>)
    });

    return  (
        <div>
            {burgers}
        </div>
    )
}

export default Burgers;