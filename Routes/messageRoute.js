import { addMessage, deleteMassege, editMassege, getAllmessage } from "../controllers/messageController/messageCRUD.js";
import  express  from "express";
import { uploadMesaggeImage } from "../controllers/imageuploadcontroller/imageUpload.js";
const router = express.Router()

router.post("/addmsg/", uploadMesaggeImage ,addMessage)
router.post("/getmsg/", getAllmessage)
router.delete("/deletemassege/:id" , deleteMassege)
router.put("/editmessage/:id" , editMassege)


export default router;