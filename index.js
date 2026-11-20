
const dotenv = require("dotenv");
dotenv.config();
const {connectPublisher} = require('./src/events/eventpublisher')// redipub sub.
const {connectConsumer} = require('./src/utils/kafka/consumer');
const KAFKA_TOPICS = require('./src/utils/kafka/topics')
const app = require('./app')

const connectDB = require("./src/config/db");
const {connectRedis} = require('./src/config/redis')
const {createTopics} = require('./src/utils/kafka/createTopics')


const PORT = process.env.PORT || 5000;  
const startServer = async ()=>{
    try {
        await connectDB();
        await connectRedis();
        await connectPublisher();
        await createTopics();
        await connectConsumer(Object.values(KAFKA_TOPICS));
        app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            }   
        )
        // test();
    } catch (error) {
        console.log("Server startup error",error);
        process.exit(1);
    }
}

startServer();
