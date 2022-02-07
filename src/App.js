import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//In react-router-dom v6, "Switch" is replaced by routes "Routes". 
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


import Navbar from "./components/navbar.component"
import ExerciseList from "./components/exercise-list.component"
import CreateUser from "./components/create-user.component"
import CreateExercise from "./components/create-exercise.component"
import EditExercise from "./components/edit-exercise.component"

// In V6, you can't use the component prop anymore. It was replaced in favor of element:
// <Route path="/" element={<Home />}></Route>


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
      <Switch>
        <Route path="/" exact component={ExerciseList}/>
        <Route path="/user"  component={CreateUser}/>
        <Route path="/exercise"  component={CreateExercise}/>
        <Route path="/update/:id"  component={EditExercise}/>
      </Switch>

      </div>
    </Router>
    
  );
}

export default App;

//this is coming with version 6
{/* <Router>
<div className="container">
  <Navbar/>
  <br/>
<Routes>
  <Route path="/" exact element={<ExerciseList/>}/>
  <Route path="/user"  element={<CreateUser/>}/>
  <Route path="/exercise"  element={<CreateExercise/>}/>
  <Route path="/update/:id"  element={<EditExercise/>}/>
</Routes>

</div>
</Router> */}