const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('../../models/doctorModels');

dotenv.config({path: './config.env'});


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose 
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
.then(() => console.log('DB connection successfull!')
);

// READ JSON FILE
const doctors = JSON.parse(fs.readFileSync(`${__dirname}/doctors-simple.json`, 'utf-8'));

//IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Doctor.create(doctors);
        console.log('Data Successfully loaded!');
    } catch (err){
        console.log(err);
    }
    process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Doctor.deleteMany();
        console.log('Data Successfully Deleted !');
    } catch (err){
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] ==='--import'){
    importData();
} else if (process.argv[2] === '--delete'){
    deleteData();
}

// console.log(process.argv);