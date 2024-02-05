const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Invalid email entry."]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', userSchema);

model.exports = User;