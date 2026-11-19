
const dotenv = require("dotenv");
dotenv.config();
const {connectPublisher} = require('./src/events/eventpublisher')// redipub sub.
const {connectConsumer} = require('./src/utils/kafka/consumer')
const app = require('./app')

const connectDB = require("./src/config/db");
const {connectRedis} = require('./src/config/redis')



const PORT = process.env.PORT || 5000;  
const startServer = async ()=>{
    try {
        await connectDB();
        await connectRedis();
        await connectPublisher();
        await connectConsumer("user.created");
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
