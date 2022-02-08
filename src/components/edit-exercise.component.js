import React,{ Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

import axios from "axios";

import spinner from './common/loading.gif';

import {FaEdit} from 'react-icons/fa';

export default class EditExercise extends Component{
    constructor(props){
        super(props);

        //2.bind the methods
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //1.define the state
        this.state = {
            username :'',
            description:'',
            duration:0,
            date : new Date(),
            users:[],
            loading:true
        }
    }

    componentDidMount(){
        //1.get the exercise for the id
        axios.get("http://localhost:5000/exercise/" + this.props.match.params.id)
            .then(exercise => {
                this.setState({
                    username :exercise.data.username,
                    description:exercise.data.description,
                    duration:exercise.data.duration,
                    date :new Date(exercise.data.date),
                    loading:false
                })
            })
            .catch(err => console.log(err))


        //2.get all the users from db
        axios.get("http://localhost:5000/user")
            .then(users => {
                this.setState({
                    users:users.data.map(user => user.username)
                })
            })
            .catch(err => console.log(err)) 
    }

    onChange(e){
        console.log(e.target.value)

        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }

    onChangeDate(date){
        console.log(date)

        this.setState({
            date : date
        })
    }

    onSubmit(e){
        e.preventDefault();
        
        //1.get the details to edit
        const Exercise={
            username: this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date
        }

        //2.see the details and pass to db
        axios.post("http://localhost:5000/exercise/update/"+ this.props.match.params.id , Exercise)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        //3.redirects to the exercise list
        window.location = '/';
    }

    render(){
        return(
            <div>
                <br /><br />

                {this.state.loading ? <div><img src={spinner} alt="loading" style={{width:"500px" , margin:"auto" , display:"block"}} /></div> :
                    
                <div style={{outlineStyle:"solid", width:"800px", padding:"10px 30px"}}>
                <h3>Edit the Exercise</h3> 

                <form onSubmit={this.onSubmit}>

                    <div className="form-group" style={{padding:"10px 0px"}}>
                        <label><h6>Username :</h6></label>

                        <select name="username"  className="form-select" value={this.state.username} onChange={this.onChange}>
                            {
                                this.state.users.map(user => {
                                    return <option  key={user} value={user}> {user}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group" style={{padding:"10px 0px"}}>
                        <label><h6>Description: </h6></label>

                        <input type="text" 
                                className="form-control" 
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                />
                    </div>

                    <div className="form-group" style={{padding:"10px 0px"}}>
                        <label><h6>Duration(in minutes):  </h6></label>

                        <input type="number" 
                                className="form-control" 
                                name="duration"
                                value={this.state.duration}
                                onChange={this.onChange}/>
                    </div>

                    <div className="form-group" style={{padding:"10px 0px"}}>
                        <label><h6>Date: </h6></label>

                        <DatePicker selected={this.state.date} onChange={this.onChangeDate}/> 
                    </div>

                    <div className="form-group" style={{padding:"30px 0px"}}>
                        <button type="submit" className="btn btn-primary"><FaEdit />  Edit Exercise</button>
                    </div>

                </form>
            </div>             
            } 

            </div>
        );
    }
}


