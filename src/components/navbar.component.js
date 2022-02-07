import React,{Component} from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component{

    render(){
        return(
            <nav className="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
                <Link className="navbar-brand" to="/">My Excer Tracker</Link>

                <div className="navbar-collapse">
                    <div className="navbar-nav mr-auto">
                        <Link className="nav-item nav-link active" to="/">All Exercises</Link>
                        <Link className="nav-item nav-link" to="/exercise">Create a Exercise Log</Link>
                        <Link className="nav-item nav-link" to="/user">Create a user</Link>
                    </div>
                </div>
            </nav>
        );
    }
}    