import { Schema, model, models } from "mongoose";

// Define the property transfer schema
const propertyTransferSchema = new Schema({
    propertyTransferNumber:{
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
    fromAccountableOfficer: {
      type: String,
      required: true,
    },
    toAccountableOfficer: {
      type: String,
      required: true,
    },
    date:{
      type:Date
    },
    transferType:{
      type:String
    },
    transferReason:{
      type:String
    },
    properties: [
      {
        propertyNumber: String,
        dateAcquired: Date,
        description: String,
        Amount: Number,
        Condition: String,
      },
    ],
    approver:{
      signature: String,
      fullName: String,
      designation: String,
      date: Date
    },
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

// Create the PropertyTransfer model
const PropertyTransfer = models.PropertyTransfer || model('PropertyTransfer', propertyTransferSchema);

export default PropertyTransfer;