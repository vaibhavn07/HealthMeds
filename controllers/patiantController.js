const Patiant = require('./../models/patiantModels');


exports.getAllPatiant = async (req, res) => {
   try{ 
    const patiant = await Patiant.find();

    res.status(200).json({
        status: 'success',
        result: patiant.length,
        data:{
            patiant
        }
    });
} catch (err){
    res.status(400).json({
        status: 'fail',
        message: 'invalid data sent!'
    });
}

};


exports.getPatiant = async (req, res) => {
  try {
   const patiant = await Patiant.findById(req.params.id);
   
   res.status(200).json({
    status: 'success',
    data:{
        patiant
    }
});

  }  catch (err){
    res.status(400).json({
        status: 'fail',
        message: err
    });
}
};

exports.createPatiant = async (req, res)=>{
    try{

    const newPatiant = await Patiant.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{
            patiant: newPatiant
        }
    });
} catch (err){
    res.status(400).json({
        status: 'fail',
        message: 'invalid data sent!'
    });
}
}; 

exports.updatePatiant = async (req, res) => {
    try {

      const patiant = await  Patiant.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true 
        });
        
        res.status(200).json({
        status: 'success',
        data: {
          doc :patiant
        }
    });
    } catch (err){
        res.status(400).json({
            status: 'fail',
            message: 'invalid data sent!'
        });
    }
};

exports.deletePatiant = async  (req, res) => {
    try{
        await Patiant.findByIdAndDelete(req.params.id);
        
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