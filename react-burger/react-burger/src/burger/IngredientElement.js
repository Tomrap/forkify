import React from 'react';
import IngredientsContext from '../context/ingredients-context'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#990000',
        display: 'inline-block',
        width: 'fit-content',
    },
    row: {
        display: "flex",
    },
    name: {
        width: "20%"
    },
    element: {
        margin: '10px'
    }   
  }));


const IngredientElement =   (props) => {

    const classes = useStyles();

    return  (
        <IngredientsContext.Consumer> 
        {context =>
              <div className={classes.row}>
                <div className={[classes.element, classes.name].join(' ')}>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</div>
                <div className={[classes.element].join(' ')}>{props.value}</div>
                <Button variant="contained" className={[classes.button, classes.element].join(' ')} onClick={() => context.increaseIngredient(props.name)}>ADD</Button>
                <Button variant="contained" className={[classes.button, classes.element].join(' ')} onClick={() => context.lowerIngredient(props.name)}>SUB</Button>
              </div>
        }
        </IngredientsContext.Consumer>
    )
}

export default IngredientElement;