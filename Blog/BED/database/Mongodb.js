import mongoose from "mongoose";

const connect = async() => {
    await mongoose.connect('mongodb+srv://Ananya18:Ananya18@cluster0.806mmrn.mongodb.net/');
    console.log('server is connected to the database...');
}

export default connect;