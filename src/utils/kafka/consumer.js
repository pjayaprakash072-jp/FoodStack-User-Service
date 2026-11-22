
const kafka = require('../../config/kafka');
const {publishMessage} = require('./producer')
const {KAFKA_TOPICS} = require('./topics')
const consumer = kafka.consumer(
  {
    groupId:process.env.KAFKA_GROUP_ID
  }
);
const connectConsumer = async(topics)=>{
  try {
    await consumer.connect();
    console.log("Consumer connected successfully!");
    for(const topic of topics){
      await consumer.subscribe(
        {
          topic,
          fromBeginning:false
        }
      )
    }
    
    await consumer.run(
      {
        eachMessage : async({topic, partition,message})=>{
          const data = JSON.parse(message.value.toString());
          console.log("Received kafka message: ", 
            {
              topic,
              partition,
              data
            }
          )
          await publishMessage(
            KAFKA_TOPICS.USER_PROFILE_CREATED,
            {
              message: " user created successfully!"
            }
          )
        }
      }
    )
  } catch (error) {
    console.log("kafka consume Error: ",error);
    throw error;
  }
}

const disconnectConsumer = async()=>{
  await consumer.disconnect();
}
module.exports = {
  consumer,
  connectConsumer,
  disconnectConsumer
}