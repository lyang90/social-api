const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    userName: {
        type: String, 
        required: true, 
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
       // VALIDATE EMAIL 
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [friend]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// TODO SETUP VIRTUAL FOR FRIEND AMOUNT
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
