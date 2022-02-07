import React,{Component} from "react";
import { Link } from "react-router-dom";

import { FaEdit , FaTrashAlt } from 'react-icons/fa';

export default class Exercise extends Component{
    constructor(props){
        super(props)
    }


    render(){
        return(
                <tr>
                    <td>{this.props.exer.username}</td>
                    <td>{this.props.exer.description}</td>
                    <td>{this.props.exer.duration}</td>
                    <td>{this.props.exer.date.substring(0,10)}</td>
                    <td>
                        <Link className="btn btn-success" to={"/update/"+this.props.exerId} style={{ width: "100px", marginRight: "10px" }}  ><FaEdit size={20} /> edit</Link>  <a href="#" className="btn btn-danger" style={{ width: "100px" }}  onClick={() => this.props.delete(this.props.exer._id)}><FaTrashAlt /> delete</a>
                    </td>
                </tr>
        );
    }
}