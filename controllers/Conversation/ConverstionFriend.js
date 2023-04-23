import User from "../../Modals/usersModal.js"


const ConverstionFriend = async  (req, res , next ) => {
    // console.log(req.params);
try{
    const userCheck = await User.findById(req.params.friendID).select([
        "email" ,
        "username",
        "_id",
        "profilepic"
    ])
    
    // console.log(userCheck);
    res.status(200).json(userCheck)

}
catch(err){
    next(err)
}
}
export default ConverstionFriend