import React , {Component} from 'react';
import logo from './../resources/img/burger-logo.png'
import menuIcon from './../resources/img/icon_Hamburger_rounded-512.png'
import SideDrawer from './SideDrawer'

class Header extends Component {

    state = {
        viewSidebar: false
    }   
    
    showSidebar = () => {
        this.setState({
            viewSidebar: true
        })
    }

    hideSidebar = () => {
        this.setState({
            viewSidebar: false
        })
    }

    render() {
        let elementArray = [];
        elementArray.push(this.state.viewSidebar ? <SideDrawer hideSidebar={this.hideSidebar}></SideDrawer> : null)
        return (
            <header className="App-header">
                <div className="row">
                    <img src={logo} alt="Omnifood logo" className="logo"></img>
                    <img src={menuIcon} alt="menu" className="menu" onClick={this.showSidebar}></img>
                </div>
                {elementArray}
            </header>
        )
    }
}        

export default Header;