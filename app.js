const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const YourEngSchema = require('./data/scheme');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/YourEng',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", function ()
{
    console.log("db connected")
});


app.get('/', (req, res) => {
    res.send("hello");
})



app.get("/register", (req, res) => {
    res.render('register');

})

app.post("/register", async ( req, res) => {
const user = new YourEngSchema(req.body.user)
    function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
    }

    const ageuser = getAge(user.dob)
    
 
    if (ageuser > 14) {
        res.send(`age is ${ageuser}, User has been registered successfully`);
            await user.save();

    }
    else {
        res.send(`age is ${ageuser}, Age should be above 14 years`);
    }
    


})

app.get('/userData', async(req, res) => {
    const users = await YourEngSchema.find({});
    res.render('userData', { users })


})

app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});




app.listen(port, (req, res) => {
    console.log("listening on port 8080");
});