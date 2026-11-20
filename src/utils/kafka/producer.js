const kafka = require('../../config/kafka');

const producer = kafka.producer();

const connnectProducer = async()=>{
  try {
    await producer.connect();
    console.log("Kafka producer connected successfully(User_Service)")
  } catch (error) {
    console.error("Kafka producer connection Error:", error);
    throw error
  }
}

const publishMessage = async(topic, msg)=>{
  try {
    await producer.send(
      {
        topic,
        messages:[
          {
            value:JSON.stringify(msg)
          }
        ]
      }
    )
    console.log("Message published to :", topic)
  } catch (error) {
    console.error("Kafka producer publishing Error:",error);
    throw error;    
  }
}

const disconnectProducer = async()=>{
  try {
    await producer.disconnect();
    console.log("Kafka Producer disconnedted successfully!")
  } catch (error) {
    console.error("Kafka Producer disconnect Error:",error);
    throw error;
  }
}

module.exports = {
  connnectProducer,
  publishMessage,
  disconnectProducer
}