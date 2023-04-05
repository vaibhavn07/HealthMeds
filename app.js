const path = require('path')
const express = require('express');
const morgan = require('morgan'); 
const helmet = require('helmet');

const doctorRouter = require('./routes/doctorRouter');
const userRouter = require('./routes/userRouter');
const patiantRouter = require('./routes/patiantRouter');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//1. Middlewares
app.use(express.static(path.join(__dirname,'public')));

// app.use(express.static('public'));

// Security HTTP headers
app.use(helmet());

//Development Logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use((req, res, next) =>{
    console.log('Hello From The Middleware 😂');
    next();
});
 
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next(); 
})


//2. ro
app.get('/homepage', (req, res) => {
    res.status(200).render('main');
})

app.get('/login', (req, res) => {
    res.status(200).render('login');
})

app.get('/register', (req, res) => {
    res.status(200).render('register');
})

app.get('/healthEd', (req, res) => {
    res.status(200).render('blog');
})

app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/patiants', patiantRouter);


module.exports = app;