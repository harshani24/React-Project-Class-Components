import React,{Component} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
     
import {FaPlusCircle} from 'react-icons/fa';


export default class CreateExercise extends Component{
    constructor(props){
        super(props);

        //2.bind the methods
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        //1.define the state
        this.state = {
            username:'',
            description : '',
            duration : 0,
            date: new Date(),
            datePicker : new Date(),
            users:[]
        }
    }

    componentDidMount(){
        // this.setState({
        //     users:["user1" , "user2" , "user3"],
        //     username:"user1"
        // })

        axios.get("http://localhost:5000/user")
                .then(res => {
                    if(res.data.length > 0){
                        this.setState({
                            users:res.data.map(user => user.username),
                            username:res.data[0].username
                        })
                    }
                    
                })
    }

    onChange(e){
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }


    onChangeDate(date){
        this.setState({
            datePicker : date
        })
    }


    onSubmit(e){
        e.preventDefault();

        //1.get details of new exercise
        const exercise = {
            username : this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date1 : this.state.date,
            date : this.state.datePicker
        }


        //2.see data and pass to db
        console.log(exercise);

        axios.post("http://localhost:5000/exercise/exercise", exercise)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err =>{
                    console.log(err)
                } );

        //3.redirect to the exercise list
        window.location = '/';
    }


    render(){
        return(
            <div>
                <br /><br />
                <div style={{outlineStyle:'solid', width:"800px" , padding:"10px 30px"}}>
                    <h3>Create an Exercise</h3>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group" style={{padding:'10px 0px'}}>
                            <label><h6>Username: </h6></label>

                            <select className="form-select" value={this.state.username} name="username" onChange={this.onChange}>
                                {
                                    this.state.users.map( user =>{
                                        return <option  key={user} value={user}> {user}</option>
                                    })
                                }
                            </select>
                            
                        </div>

                        <div className="form-group" style={{padding:'10px 0px'}}>
                            <label><h6>Description: </h6></label>

                            <input type="text" 
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    name='description' />
                        </div>

                        <div className="form-group" style={{padding:'10px 0px'}}>
                            <label><h6>Duration(in minutes): </h6></label>

                            <input type="number" 
                                    className="form-control" 
                                    value={this.state.duration}
                                    onChange={this.onChange}
                                    name='duration'/>
                        </div>

                        <div className="form-group" style={{padding:'10px 0px'}}>
                            <label><h6>Date: </h6></label>

                            <input type="date" 
                                    className="form-control" 
                                    value={this.state.date}
                                    onChange={this.onChange}
                                    name='date'/>                            
                        </div>

                        <div className="form-group" style={{padding:'10px 0px'}}>
                            <label><h6>Date(From Picker): </h6></label>

                            <DatePicker selected={this.state.datePicker} onChange={this.onChangeDate}/>                         
                        </div>


                        <div className="form-group" style={{padding:'30px 0px'}}>
                        <button type="submit" className="btn btn-primary"><FaPlusCircle />  Create an Exercise</button> 
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}



{/* <select class="form-select" onChange={(e) => console.log(e.target.value)}>
                                <option value="1">user 1</option>
                                <option value="2">user 2</option>
                                <option value="3">user 3</option>
</select>
                             */}


//<DatePicker selected={new Date()} onChange={(e) => {console.log(e)}}/>   