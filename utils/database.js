import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB is already connected');
        return
    }

    try{
        await mongoose.connect("mongodb://localhost:27017/?directConnection=true", {
            dbName: "logicSphere",
            useNewUrlParser:true,
            useUnifiedTopology:false
        })

        isConnected = true;

        console.log('MongoDB connected')
    }catch(error){
        console.log(error)
    }
}

await connectToDB()