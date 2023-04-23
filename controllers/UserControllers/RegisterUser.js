import User from "../../Modals/usersModal.js"
import crypto from "crypto"

let salt = "f844b09ff50c"
const registerUser = async (req, res ,next) => {
    try{
        const {username ,email , password} = req.body
        const userCheck = await User.findOne({email})
        if(userCheck)
        return res.json({msg : "Email already used" , status : false})
       
        let hash = crypto.pbkdf2Sync(password, salt,  
            1000, 15 , `sha512`).toString(`hex`);
          const user = await User.create({
            email,
            username,
            password : hash
        })
        if(user){
        return res.status(201).json({ status : true})
        }
    } catch(err){
        next(err)
    }

}

export default registerUser