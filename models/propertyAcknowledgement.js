import { Schema, model, models } from "mongoose";

// Define the property transfer schema
const propertyAcknowledgementSchema = new Schema({
    propertyAcknowledgementNumber:{
        type:String,
        unique:true
    },
    entityName: {
      type: String,
      required: true
    },
    fundCluster: {
      type: String,
    },
    date:{
      type:Date
    },
    properties: [
      {
        quantity: Number,
        propertyNumber: String,
        dateAcquired: Date,
        description: String,
        amount: Number
      },
    ],
    issuer:{
      signature: String,
      fullName: String,
      designation: String,
      date: Date
    },
    receiver:{
      signature: String,
      fullName: String,
      designation: String,
      date: Date
    }
});

// Create the Property Acknowledgement model
const PropertyAcknowledgement = models.PropertyAcknowledgement || model('PropertyAcknowledgement', propertyAcknowledgementSchema);

export default PropertyAcknowledgement;