import ConversationModal from "../../Modals/ConversationModal.js";

const ConverstionStart = async (req, res, next) => {
    // console.log(req.params);
    try {
        const { from, to } = req.body
        const searcharray =[to , from]
        const findConversation = await ConversationModal.findOne({
            'member': {
                $all: searcharray
            }
        })
        // console.log(!findConversation, "findConverSation");
        // console.log(findConversation, "findConversation");
        if (!findConversation) {
            const data = await ConversationModal.create({
                member : [from, to],
            })
            if(data) return res.json({msg : "Message added Successful" , status : true , data:data})
            return res.json({msg : "falid to add message to the database", status : false})
            }else{
            return res.json({msg : "Already Conversation Start", status : true , data : findConversation})
        }

    }
    catch (err) {
        next(err)
    }
}


export default ConverstionStart