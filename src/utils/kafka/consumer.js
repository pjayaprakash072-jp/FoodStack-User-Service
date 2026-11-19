
const kafka = require('../../config/kafka');
const consumer = kafka.consumer(
  {
    groupId:process.env.KAFKA_GROUP_ID
  }
);
const connectConsumer = async(topic)=>{
  try {
    await consumer.connect();
    console.log("Consumer connected successfully!");
    await consumer.subscribe(
      {
        topic,
        fromBeginning:true
      }
    )
    await consumer.run(
      {
        eachMessage : async({topic, partition,message})=>{
          const data = JSON.parse(message.value.toString());
          console.log("Received kafka message",
            {
              topic,
              partition,
              data
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