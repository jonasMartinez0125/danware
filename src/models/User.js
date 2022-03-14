import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.generateHash = async function(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export default model('User', userSchema);