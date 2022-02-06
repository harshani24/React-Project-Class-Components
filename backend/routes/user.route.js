//-----------1
const router = require('express').Router();

//-----------2
const User = require('../models/user.model');


//-----------4

//get all users
//router.route('/').get( (req, res) =>{})
router.get('/', (req, res) =>{
    User.find()
     .then(users => res.json(users))
     .catch(err => res.status(400).json(err));
});


//add new user
router.post('/user', (req,res) =>{
    
    //1.get details of new user
    const {
        username
    } = req.body;

    //2.create a new user
    const newUser = User({username});

    //3.save the new user
    newUser.save()
        .then(() => res.json('New user added'))
        .catch(err => res.status(400).json(err));
})


//-----------3
module.exports = router;