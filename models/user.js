import { Schema, model, models } from "mongoose";

// Define the property transfer schema
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        first:{
            type: String,
            required:true,
        },
        middle:{
            type: String
        },
        last:{
            type: String,
            required:true,
        },
    },
    password:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
    },
    isAdmin: {
        type: Boolean
    },
    status: {
        type: String
    },
    logStatus:{
        type: String
    }
});

const User = models.User || model('User', userSchema);

export default User;