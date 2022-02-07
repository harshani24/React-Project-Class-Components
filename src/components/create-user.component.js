import React,{Component} from "react";

import axios from "axios";

import {FaPlusCircle} from 'react-icons/fa';


export default class CreateUser extends Component{
    constructor(props){
        super(props);

        //2.bind all methods 
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //1.create a state to store the user data
        this.state = {
            username : ''
        }
    }

    componentDidMount(){
        console.log("Create User")
    }

    onChange(e){
        //1.save the typed data in state
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        });

    }

    onSubmit(e){
        //to prevent default submitting (here if we don't do that whenever we clicked the submit button it intanstly refresh the page)
        e.preventDefault();

        //1.get the user details
        const user = {
            username : this.state.username
        }

        //2.see the details and pass to db
        console.log(user);

        axios.post("http://localhost:5000/user/user", user)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));

        //3.again make the username as empty
        this.setState({
            ...this.state,
            username : ''
        })

        //window.location = '/';
    }

    
    render(){
        return(
            <div>
                <br /><br />

                <div style={{ outlineStyle: "solid", width: "800px", height: "100%", padding: "10px 30px" }}>
                <h3>Create New User</h3>

                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label><h6>Username:</h6> </label>
                        <input type="text"
                               required
                               value={this.state.username}
                               name = "username"
                               onChange={this.onChange}
                               className="form-control"
                        />
                    </div>

                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary"><FaPlusCircle />  Create a User</button> 
                    </div>

                </form>
                </div>
            </div>
        );
    }
}

//<input type="submit" value="Create a User" className="btn btn-primary" />