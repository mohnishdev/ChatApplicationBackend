import ConversationModal from "../../Modals/ConversationModal.js";
import usersModal from "../../Modals/usersModal.js";


const ConversationHas = async (req, res , next) => {
    try{
        const hasConversation = await ConversationModal.find({member:{$in :[req.params.id]}})
        const array_ids = hasConversation.map(value => value.member.find(val => val !== req.params.id))
        // console.log(hasConversation, "hasConversation");
        let data = await usersModal.find(
            {'_id': { $in: array_ids}}
          ).select(["-password" ,"-start"]);
          
        // console.log(data ,hasConversation  , "userFind");
        const newData = hasConversation.map((item, index)=> {
            // const cloneItem = {...item}
            // console.log(item ,"cloneItem");
            if(item.member.map(memberId => memberId === data[index]._id)){
               return item = {...item , conversationUser:data[index]}
            }
        })

        const conversatinUserData = newData.map((item) =>{
        //   console.log(item , "item");
          return {conversationID : item._doc._id , member : item._doc.member , UnseenMessage:item._doc.UnseenMessage , userId:item.conversationUser._id , userProfilepic :item.conversationUser.profilepic , 
                 username :item.conversationUser.username , useremail:item.conversationUser.email , time :item._doc.latestMessage.time }
        })
        .sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.time) - new Date(a.time);
          }) 
        // console.log(conversatinUserData , "new data");
        return res.status(200).json({hasConversation : hasConversation ,  hasconversatinData: conversatinUserData })

    }catch(err){
        next(err)
    }
}

export default ConversationHas