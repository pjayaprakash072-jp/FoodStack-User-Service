const kafka = require('../../config/kafka');
const {KAFKA_TOPICS} = require('./topics');
const createTopics = async()=>{
  const admin = kafka.admin();
  try {
    await admin.connect();

    const topics = Object.values(KAFKA_TOPICS).map(
      topic=>(
        {
          topic,
          numPartitions:2,
          replicationFactor:1
        }
      )
    )
    await admin.createTopics(
      {
        topics,
        waitForLeaders:true
      }
    )
    console.log("Kafka topics registered successfully!");
  } catch (error) {
    console.error("Kafka topic creation failed!",error);
    throw error;
  }finally{
    await admin.disconnect();
  }
}

module.exports = {
  createTopics
}