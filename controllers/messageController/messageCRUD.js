import messagemodal from "../../Modals/messagemodal.js"
import Conversation from "../../Modals/ConversationModal.js"
import fs from "fs"
export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message, conversationID } = req.body
        // console.log(req.file ,  req.body);
        let data 
        if(message){
            // console.log(message);
         data = await messagemodal.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })
    }if(req.file){
        // console.log(req.file);
        // console.log("thisssss");
        data = await messagemodal.create({
            message: { image: `uploads/${req.file.filename}` },
            users: [from, to],
            sender: from
        })
    }
        // console.log(data);
        // const updatecon = await Conversation.findOneAndUpdate({ _id: conversationID }, {
        //     $set: { latestMessage: { message: message || "Pic", messageId: data._id, time: data.createdAt, sender: data.sender } },
        //     $push: { UnseenMessage: { message: data.message , messageId: data._id, time: data.createdAt, sender: data.sender } }
        // })        // console.log(updatecon , "update con");
        if (data) return res.json({ msg: "Message added Successful", status: true, newmessageData: data })
        return res.json({ msg: "falid to add message to the database", status: false })
        
    } catch (err) {
        console.log("errrr" , err);
        
        next(err)
    }
}
export const getAllmessage = async (req, res, next) => {
    try {
        const { from, to, conversationID, latestMessageSender } = req.body
        // console.log(from ,"from" , to , "to" ,latestMessageSender ,"latestMessageSender")
        // console.log(conversationID);
        const message = await messagemodal
            .find({
                users: {
                    $all: [from, to],
                },
            })
            .sort({ updateAt: 1 })
        const projectMessage = message.map((msg) => {
            // console.log(msg.sender);
            return {
                id: msg._id,
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                messageImage:msg.message.image,
                send: msg.createdAt,
            }
        })
            if(to === latestMessageSender){
                const readmessage = await Conversation.findOneAndUpdate({ _id: conversationID } ,{
                    $unset:{latestMessage : 1 , UnseenMessage : 1}
                })

            }
         
        return res.status(200).json(projectMessage)
    } catch (err) {
        next(err)
    }
}

export const deleteMassege = async (req, res, next) => {
    // console.log(req.params.id,"62 delete" );
    try {
        const findAndDeleteMessage = await messagemodal.findOneAndDelete({_id: req.params.id })
        // const deletedMessage = await messagemodal.deleteOne({ _id: req.params.id })
        if (findAndDeleteMessage){
            if(findAndDeleteMessage.message.image){
            fs.unlink(`./public/${findAndDeleteMessage.message.image}`,(err)=>{
                if(err){
                    console.log(err ,"errr");
                }
            })
            }
            return res.status(200).json({ status: true, message: "message deleted successfully" })
        }
        res.status(500).json({ status: false, massege: "massege not deleted" })
    } catch (err) {
        next(err)
    }
}

export const editMassege = async (req, res, next) => {
    // console.log(req.params.id , "626fc2e12497cb63b23da1b4");
    const { message } = req.body
    // console.log(message, "57");
    try {
        // console.log(req.params.id);
        const EditMassage = await messagemodal.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    message: { text: message }
                }
            })
        if (EditMassage)
            return res.status(200).json({ status: true, message: "message Edit successfully" })
        res.status(500).json({ status: false, massege: "massege not Edit" })
    } catch (err) {
        next(err)
    }
}