import User from "../model/userModel.js"
import bcrypt from "bcrypt";

export const register = async(req,res,next)=>{
    //  console.log(req.body);
   try { 
    const {username ,email ,password} = req.body;
    const usernmaeCheck= await User.findOne({username});
    if(usernmaeCheck){
        return res.json({msg:"Username Already used",status:false});
    }
    const emailCheck= await User.findOne({email});
    if(emailCheck){
        return res.json({msg:"Email Already used",status:false});
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password:hashedPassword,
    });
    delete user.password;
    return res.json({status :true ,user});
} catch(ex){
  next(ex);
}
};

export const login = async(req,res,next)=>{
    try { 
        const {username ,password} = req.body;
        // console.log(req.body);
    const user= await User.findOne({ username });
    if(!user)
        return res.json({msg:"Incorrect username or password",status:false});
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
         return res.json({ msg : "Incorrect username and password",status:false});
        delete user.password;
         return res.json({status:true , user })
 } catch(ex){
  next(ex);
}
};

export const setAvatar = async(req,res,next)=>{
    try{
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId,{
        isAvatarImageSet:true,
        avatarImage
    });
    return res.json({isSet:userData.isAvatarImageSet,
    image: userData.avatarImage,
  });
    }catch(ex){
        next(ex)
    }
}

export const getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find({_id: {$ne:req.params.id}}).select([
            "email","username","avatarImage","_id",
        ]);
        return res.json(users);
    }
    catch(ex){
        next(ex);
    }
}