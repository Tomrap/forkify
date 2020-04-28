import React , { useContext } from 'react';
import Modal from "@material-ui/core/Modal";
import {FirebaseContext} from '../firebase';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  modal_content: {
    backgroundColor: theme.palette.background.paper,
    margin: '15% auto',
    padding: '20px',
    width: '20%',
  },
}));

const OrderModal = (props) => { 

    const classes = useStyles();

    const firebaseContext = useContext(FirebaseContext);

    const [outerModalOpen, setOuterModalOpen] = React.useState(false);
    const [innerModalOpen, setinnerModalOpen] = React.useState(false);
    const [databaseResponse, setDatabaseResponse] = React.useState("No response");

    const handleOuterModalOpen = () => {
      setOuterModalOpen(true);
    };

    const handleOuterModalClose = () => {
      setOuterModalOpen(false);
    };

    const handleInnerModalOpen = () => {
      setinnerModalOpen(true);
    };

    const handleInnerModalClose = () => {
      setinnerModalOpen(false);
        props.refresh();
    };

    let ingredientList = [];
    let burger = {}
    burger.ingredients = {};

    for (const ingredient in props.currentIngredients) {
        ingredientList.push(
            <li key={ingredient}>{props.currentIngredients[ingredient]} {ingredient} </li>
        )
        burger.ingredients[ingredient] = props.currentIngredients[ingredient];
    }
    burger.price = props.price
    burger.name = props.name

    const handleResponse = (error, response) => {
      if(error) {
        setDatabaseResponse("Error adding document: " + response)
      } else {
        setDatabaseResponse("Document written with ID: " + response.id);
      }
      handleOuterModalClose();
      handleInnerModalOpen();
    };

    return (
        <div>
          <Button onClick={handleOuterModalOpen}>Order Now</Button>
          <Modal
            open={outerModalOpen}
            onClose={handleOuterModalClose}
          >         
            <div>
                <div className={classes.modal_content}>
                <span onClick={handleOuterModalClose}>&times;</span>
                <p style={{textAlign: 'center'}}>Your Order</p>
                <p>Delicious Burger with following ingredients:</p>
                <ul >
                    {ingredientList}
                </ul>
                <p>Total Price: {props.price}</p>
                <p>Save to Database?</p>
                <Button onClick={() => {
                    firebaseContext.saveToDatabase(burger, 
                      handleResponse.bind(undefined,false), handleResponse.bind(undefined,true)
                    ) 
                }
                }>Save</Button>
                <Button onClick={handleOuterModalClose}>Cancel</Button>
                </div>
            </div>
          </Modal>
          <Modal  
              open={innerModalOpen} onClose={handleInnerModalClose}>
              <div>
                <div className={classes.modal_content}>
                  <p>{databaseResponse}</p>
                </div>
              </div>    
          </Modal>
        </div>
      );
}
export default OrderModal;    