// import  register  from "../controllers/userControllers.js";
// import login from "../controllers/login.js";
// import Allusersget from "../controllers/Allusersget.js";
import express from "express"
import UpdateUserdetail from "../controllers/UserControllers/updateUserDetails.js";
import registerUser from "../controllers/UserControllers/RegisterUser.js";
import LoginUser from "../controllers/UserControllers/LoginUser.js";
import AllusersGet from "../controllers/UserControllers/AlluserGet.js";
import uploadImage from "../controllers/imageuploadcontroller/imageUpload.js";
import SearchUser from "../controllers/UserControllers/SearchUser.js";

const router = express.Router()

router.post("/register" , registerUser)
router.post("/login" , LoginUser)
router.get("/search/user" , SearchUser)
router.get("/allusers/:id", AllusersGet)
router.put("/updateUser/:id", uploadImage , UpdateUserdetail)

export default router;