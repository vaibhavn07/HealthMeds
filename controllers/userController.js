const User = require('./../models/userModels');


exports.getAllUser = async (req, res) => {
   try{ 
    const user = await User.find();

    res.status(200).json({
        status: 'success',
        result: user.length,
        data:{
            user
        }
    });
} catch (err){
    res.status(400).json({
        status: 'fail',
        message: 'invalid data sent!'
    });
}

};

exports.getUser = async (req, res) => {
  try {
   const user = await User.findById(req.params.id);
   
   res.status(200).json({
    status: 'success',
    data:{
        user
    }
});

  }  catch (err){
    res.status(400).json({
        status: 'fail',
        message: err
    });
}
};

exports.createUser = async (req, res)=>{
    try{
        
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{
            newUser
        }
    });
} catch (err){
    res.status(400).json({
        status: 'fail',
        message: 'invalid data sent!'
    });
}
}; 

exports.updateUser = async (req, res) => {
    try {
      const user = await  User.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true 
        });
        
        res.status(200).json({
        status: 'success',
        data: {
          user
        }
    });
    } catch (err){
        res.status(400).json({
            status: 'fail',
            message: 'invalid data sent!'
        });
    }
};

exports.deleteUser = async  (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        
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