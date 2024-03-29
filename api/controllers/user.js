import User from "../models/User.js"




export const updateUser = async (req,res,next)  => {
        //by default findby id return old object to return updated object new:true
   
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
            // console.log(updateUser);
            res.status(200).json(updateUser)
        }catch(err){
            next(err);
        }
}

export const deleteUser = async (req,res,next)  => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
         res.status(200).json(user);
     }catch(err){
         next(err);
     }
}

export const getUser = async (req,res,next)  => {
    
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

export const getUsers = async (req,res,next)  => {
    
    // const failed = true;
    // if(failed) return next(next(createError(401,"you are not authenticated")))
    try{
        const users = await User.find();
        res.status(200).json(users)
    }catch(err){
        // res.status(500).json(err);
        next(err);
    }
}