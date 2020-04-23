import React , {Component} from 'react';
import { FirebaseContext } from '../firebase';
import Loader from '../Loader';
import Burgers from './Burgers';


class ShowBurgersController extends Component {

    state = {
        loading: true,
        burgerMap: new Map()
    }

    componentDidMount() {
        let value = this.context;
        value.listenToDatabaseChanges((res) => {
            this.setState((prevState => {
                //perform deep copy !!
                res.docChanges().forEach((change) => {
                    if (change.type === "removed") {
                        prevState.burgerMap.delete(change.doc.id);
                    } else {
                        prevState.burgerMap.set(change.doc.id, change.doc.data().burger);
                    }
                });
                return {
                    loading: false,
                    burgerMap: prevState.burgerMap
                }
            }))
        })
    }

    render() {
        let burgers = this.state.loading ?  <Loader /> : <Burgers burgerList = {Array.from(this.state.burgerMap.values())}></Burgers>
        return (
             burgers
        )
    }
}
ShowBurgersController.contextType = FirebaseContext;        

export default ShowBurgersController;