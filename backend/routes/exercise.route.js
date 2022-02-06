//-------------1
const router = require('express').Router();

//-------------2
const Exercise = require('../models/exercise.model');



//-------------4

//1.get all exercises
router.get('/',(req,res) => {
    Exercise.find()
     .then(exercises => res.json(exercises))
     .catch(err => res.status(400).json(err));
});


//2.get one exercise
router.get('/:exercise_id', (req,res) =>{
    const id = req.params.exercise_id;

    Exercise.findById(id)
        .then(exercise => res.json(exercise))
        .catch(err => res.json(err));
});



//3.add a new exercise
router.post('/exercise', (req,res) => {
    //1.get the details of the exercise
     const username = req.body.username;
     const description = req.body.description;
     const duration = Number(req.body.duration);
     const date = Date.parse(req.body.date);


    //2.create an exercise passing details
     const newExercise = Exercise({
        username,
        description,
        duration,
        date
     });

    //3.save that obj in db
    newExercise.save()
     .then(() => res.json('New exercise added'))
     .catch(err => res.json(err));
});



//4.delete an exercise
router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
     .then(() => res.json('Exercise deleted'))
     .catch(err => res.status(400).json(err));
});



//5.update an exercise

//I -> findById() , save()
router.post('/update/:id', (req,res) => {
    //catch the exercise what we need to update
    Exercise.findById(req.params.id)
        .then(exercise =>{
            //now we have existing obj
            //we need to replace that with newly added data

            exercise.username = req.body.username;
            exercise.duration = Number(req.body.duration);
            exercise.description = req.body.description;
            exercise.date = Date.parse(req.body.date);


            //now need to save updated one in db
            exercise.save()
             .then(() => res.json("Exercise updated"))
             .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});


//II -> findOneAndUpdate()
router.put('/update',(req,res) =>{
    //catch the details
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const id = req.body.id;

    const update = {username , description , duration , date};

    const filter = { "_id" : id};


    // Exercise.findOneAndUpdate(filter , update , {upsert : true})
    //  .then(exercise => res.json(exercise))
    //  .catch(err => res.status(400).json(err));


    Exercise.findOneAndUpdate(filter , update , {upsert : true} , (err, exercise) => {
        if(err)
            return res.status(400).json("Error" + err);

            //update wenna kalin thibba obj eka enne
        console.log(exercise)    
        return res.json('exercise Updated');

    });

});




//-------------3
module.exports = router;