const User = require('../../../models/User');
const {publishMessage} = require('../producer');
const crypto = require('crypto')
const requestCreateUser = async(event)=>{
    try{
      const {authId,data} = event
      const {name,email,phone}  = data
      if(!authId || !name || !email){
        throw new Error("Invalid User registration event!");
      }
      const user = await User.findOneAndUpdate(
        {
          authId,
        },{
          $setOnInsert:{
            authId,
            name,
            email: email.toLowerCase(),
            phone,
            authProvider:"local"
          }
        },
        {
          new:true,
          upsert:true,
          runValidators:true
        }
      )
      console.log("User profile created successfully!");
      await publishMessage(
        "user.profile.created",
        {
          eventId:crypto.randomUUID(),
          eventType:"USER_PROFILE_CREATED",
          authId,
          occuredAt: new Date().toISOString(),
          data:{
            userId:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone
          }
        }
      )
    }catch(err){
      console.log("Error",err);
      await publishMessage(
        "user.profile.failed",
        {
          eventId:crypto.randomUUID(),
          eventType:"USER_PROFILE_FAILED",
          authId:event.authId,
          occuredAt: new Date().toISOString(),
          data:{
            reason:err.message
          }
        }
      )
    }
}

module.exports = {
  requestCreateUser
};