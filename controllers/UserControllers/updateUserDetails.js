// import Users from "../../Modals/usersModal";
import Users from "../../Modals/usersModal.js"
import path from "path"

import fs from "fs"
const UpdateUserdetail = async (req, res, next) => {
    // console.log("this is Running", req.body , req.file);
    try {
        // const userId = req.params.id
        // const {username} = req.body
        const user = await Users.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    profilepic: req.body.image || `ProfileImage/${req.file.filename}` ,
                    username: req.body.username,
                }
            },
            {
                upsert: true
            }
        )
        // return res.json({status :true})
            if(user){
                const UpdateUserdetails = await Users.findOne({_id : user._id})
                // console.log(user.profilepic , UpdateUserdetails.profilepic );
                if(user.profilepic !== UpdateUserdetails.profilepic){
                    // console.log("!==");
                    // console.log(user.profilepic , UpdateUserdetails.profilepic , "msbcjh" );
                    fs.unlink(`./public/${user.profilepic}` ,(err)=>{
                        if(err){
                            console.log(err ,"errr");
                        }
                        // console.log("this file delete");
                    })
                }else{
                    // console.log("===");
                }
                return res.json({ status: true, user: {name :UpdateUserdetails.username , email : UpdateUserdetails.email , id :UpdateUserdetails._id , profilepic : UpdateUserdetails.profilepic}})
            }
        // console.log(user , "userrrr");
    }
    catch (err) {
        next(err)
    }
}
export default UpdateUserdetail