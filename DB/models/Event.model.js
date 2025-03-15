import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 1000,
        },
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        registeredUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Event", eventSchema);
