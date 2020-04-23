import React from 'react';
import {Link} from 'react-router-dom'

const SideDrawer = (props) => {

    return  (
        <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={props.hideSidebar}>&times;</a>
            <Link to="home" onClick={props.hideSidebar}>Home</Link>
            <Link to="showBurgers" onClick={props.hideSidebar}>Available burgers</Link>
        </div>
    )
}

export default SideDrawer;