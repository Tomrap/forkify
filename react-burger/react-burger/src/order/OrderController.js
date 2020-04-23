import React, {Component} from 'react';
import OrderModal from './orderModal'

class OrderController extends Component {

    state = {
        viewOrder: false
    }   

    shouldComponentUpdate() {
        return this.state.viewOrder;
    }
    
    showOrder = () => {
        this.setState({
            viewOrder: true
        })
    }

    hideOrder = () => {
        this.setState({
            viewOrder: false
        })
    }

    render() {
        let order = this.state.viewOrder ?            
            <OrderModal currentIngredients = {this.props.currentIngredients} price = {this.props.price} 
                hideOrder = {this.hideOrder}></OrderModal>
            : null
        
        return (
            <div>
                <button onClick={this.showOrder}>Order Now</button>
                {order}
            </div>
        )
    }
}        

export default OrderController;