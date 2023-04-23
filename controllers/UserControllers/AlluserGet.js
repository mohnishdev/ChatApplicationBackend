import User from "../../Modals/usersModal.js"
// window.location.reload(true)
const AllusersGet = async (req, res, next) =>{
    // console.log("yeeee" ,req.params.id);
    try{
        const users = await User.find({_id :{$ne : req.params.id} }).select([
            "email",
            "username",
            "_id"
        ])
        return res.json({status: true , users: users})
    }catch(err){
        next(err)
    }
}

export default AllusersGet