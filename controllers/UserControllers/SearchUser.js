import Users from "../../Modals/usersModal.js"
const SearchUser =  async (req, res, next) =>{
    // console.log("yeeee" ,req.query , req.params);
    try{
    const value  =  new RegExp(req.query.value, 'i')
        const users = await Users.find({ $or :[ 
            {username : {$regex : value}} ,  
            {email : {$regex : value}}
        ]})
        return res.json({status: true , users: users})

    // console.log(users);
    }catch(err){
        next(err)
    }
}

export default SearchUser