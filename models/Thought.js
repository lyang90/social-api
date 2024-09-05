const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String, 
        required: true, 
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userName: 
    {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// TODO SETUP VIRTUAL FOR reaction AMOUNT
thoughtSchema
  .virtual('reactionCount')
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
const thought = model('thought', thoughtSchema);

module.exports = thought;
