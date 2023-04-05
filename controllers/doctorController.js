const Doctor = require('./../models/doctorModels');


exports.getAllDoctor = async (req, res) => {
   try{ 
    console.log(req.query, queryObj);
     
    // BUILD QUERY
    // 1.A) FILTERING
     const queryObj = { ...req.query };
     const excludedFields = ['page', 'sort', 'limit', 'fields'];
     excludedFields.forEach(el => delete queryObj[el]);

    // 1.B) ADVANCED FILTERING
     let queryStr = Doctor.find(queryObj);
     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
     console.log(JSON.parse(queryStr));

     let query = Doctor.find(JSON.parse(queryStr));

     // 2) Sorting
     if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        console.log(sortBy);
        query = query.sort(req.query.sort);
     } else {
        query = query.sort('-createdAt');
     }

     // 3) Field limiting
     if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query - query.select(fields);
     } else {
        query = query.select('-__v');
     }
    
    // EXECUTE QUERY
    const doctor = await query;


    //  const doctor = await Doctor.find({
    //     duration: 5,
    //     difficulty: 'easy'
    //  });

    //  const doctor = await Doctor.find()
    //  .where('duration')
    //  .equals(5)
    //  .where('difficulty')
    //  .equals('easy');


    //SEND RESPONSE
 
    res.status(200).json({
        status: 'success',
        result: doctor.length,
        data:{
            doctor
        }
    });
} catch (err){
    res.status(400).json({
        status: 'fail',
        message: 'invalid data sent!'
    });
}

};


exports.getDoctor = async (req, res) => {
  try {
   const doctor = await Doctor.findById(req.params.id);
   
   res.status(200).json({
    status: 'success',
    data:{
        doctor
    }
});

  }  catch (err){
    res.status(400).json({
        status: 'fail',
        message: err
    });
}
    // const doc = healthmeds.find(el => el.id === id);

    // res.status(200).json({
    //     status: 'success',
    //     data:{
    //       doc
    //     }
    // });
};

exports.createDoctor = async (req, res)=>{
    try{

    // const newDoctor = new Doctor({})
    // newDoctor.save

    const newDoctor = await Doctor.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{
            doctor: newDoctor
        }
    });
} catch (err){
    res.status(400).json({
        status: 'fail',
        message: 'invalid data sent!'
    });
}
}; 

exports.updateDoctor = async (req, res) => {
    try {

      const doctor = await  Doctor.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true 
        });
        
        res.status(200).json({
        status: 'success',
        data: {
          doc :doctor
        }
    });
    } catch (err){
        res.status(400).json({
            status: 'fail',
            message: 'invalid data sent!'
        });
    }
};

exports.deleteDoctor = async  (req, res) => {
    try{
        await Doctor.findByIdAndDelete(req.params.id);
        
    res.status(204).json({
            status: 'success',
            data: null
        });

    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'error'
        });
    } 
};