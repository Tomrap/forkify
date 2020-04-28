import React from 'react';
import IngredientElement from './IngredientElement'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    ingredientList: {
        display: 'inline-block'
    }
  }));

const IngredientList = (props) => {

    const classes = useStyles();

    let IngredientElementList = [];

    for (const ingredient in props.currentIngredients) {
        IngredientElementList.push(
            <IngredientElement key={ingredient} name = {ingredient} value={props.currentIngredients[ingredient]}></IngredientElement>
        )
    }
    return  (
        <div className={classes.ingredientList}>
            {IngredientElementList}
        </div>
    )
}

export default IngredientList;