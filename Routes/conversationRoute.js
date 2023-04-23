import  express  from "express";
// import Converstion from "../controllers/Conversation.js";
import ConversationHas from "../controllers/Conversation/ConversationHas.js";
import ConverstionFriend from "../controllers/Conversation/ConverstionFriend.js";
import ConverstionStart from "../controllers/Conversation/ConverstionStart.js";
// import ConversationStart from "../controllers/ConverstionStart.js";
const router = express.Router()

router.post("/conversation" , ConverstionStart)
router.get("/conversatin/:id" , ConversationHas)
router.get("/users/:friendID", ConverstionFriend)

export default router