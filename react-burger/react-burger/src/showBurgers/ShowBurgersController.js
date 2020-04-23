import React , {Component} from 'react';
import { FirebaseContext } from '../firebase';
import Loader from '../Loader';
import Burgers from './Burgers';


class ShowBurgersController extends Component {

    state = {
        loading: true,
        burgerList: {}
    }

    componentDidMount() {
        let value = this.context;
        value.getAllBurgers().then((res) => {
            let curBurgerList = [];
            res.forEach(element => {
                curBurgerList.push(element.burger.ingredients)
            });
            this.setState({
                loading: false,
                burgerList: curBurgerList
            })
        })
    }

    render() {

        let burgers = this.state.loading ?  <Loader /> : <Burgers burgerList = {this.state.burgerList}></Burgers>

        return (
             burgers
        )
    }
}
ShowBurgersController.contextType = FirebaseContext;        

export default ShowBurgersController;