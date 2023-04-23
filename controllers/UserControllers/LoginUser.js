import User from "../../Modals/usersModal.js"
import crypto from "crypto"

let salt = "f844b09ff50c"
const LoginUser = async (req, res, next) => {
    try {
        const userCheck = await User.findOne({
            email : req.body.email,
            password : crypto.pbkdf2Sync(req.body.password, salt,  
                1000, 15, `sha512`).toString(`hex`)
        })
        // console.log(userCheck);
        if (!userCheck)
            return res.json({ msg: "Incorrect Email or password", status: false })
        return res.json({ status: true, user: {profilepic : userCheck.profilepic , name: userCheck.username, email: userCheck.email , id: userCheck._id    } })
    } catch (err) {
        next(err)
    }

}

export default LoginUser