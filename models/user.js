import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        profile: { type: String, required: true },
        id: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default User =
    mongoose.models.User || mongoose.model("User", UserSchema);
