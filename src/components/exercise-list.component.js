import React,{Component} from "react";
import Exercise from "./exercise.component";

import axios from "axios";

import Spinner from './common/Spinner';


// const Exercise = props => (
    // <tr>
    // <td>{this.props.exer.username}</td>
    // <td>{this.props.exer.description}</td>
    // <td>{this.props.exer.duration}</td>
    // <td>{this.props.exer.date.substring(0,10)}</td>
    // <td>
    //     <Link to={"/update/"+this.props.exerId}>edit</Link> | <a href="#" onClick={() => this.props.delete(this.props.exer._id)}>delete</a>
    // </td>
    // </tr>
// )

export default class ExerciseList extends Component{
    
    constructor(props){
        super(props);

        //2.bind methods
        this.deleteExercise = this.deleteExercise.bind(this)

        //1.set state
        this.state = {
          exercises : [],
          loading:true
        }
    }



    componentDidMount(){
        //get all exercises details from db
        axios.get("http://localhost:5000/exercise/")
              .then( res => {
                  this.setState({
                      exercises : res.data,
                      loading:false
                  })
              })
              .catch(err => console.log(err))
    }

    deleteExercise(id){
        //delete from db
        axios.delete("http://localhost:5000/exercise/"+ id)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        //filter from exerciseList
        this.setState({
            exercises: this.state.exercises.filter( exer => exer._id != id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(exercise => {
            return(<Exercise exer={exercise} exerId={exercise._id} delete={this.deleteExercise}  key={exercise._id}/>)
        })
    }

    render(){
        return(
            <div>
                 <br /><br />

                {this.state.loading ? <div><Spinner/></div> : 
                     <div style={{outlineStyle:"solid", width:"800px" ,height:"100%", padding:"10px 30px"}}>
                     <h3>Logged Exercise</h3>
    
                     <div className="table-responsive">
                        <table className="table  table-bordered border-dark table-hover">
                            <thead className="table-dark"> 
                                <tr>
                                    <th>Username</th>
                                    <th>Description</th>
                                    <th>Duration</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                             {this.exerciseList()}
                            </tbody>
                        </table>
                     </div>
                     
                     </div>
                }

                

            </div>
        );
    }
}