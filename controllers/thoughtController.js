const { Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with id given.' });
      }

      res.json({ message: 'The thought has been succesfully updated.' })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // Delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with id given.' });
      }

      res.json({ message: 'The thought has been deleted.' })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // create reaction
  async createReaction(req, res) {
    console.log("createReaction", req.body);
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      
      if (!reactionData) {
        return res.status(404).json({ message: 'No reaction found with id given.' });
      }

      res.json(reactionData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // Delete Reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: 'No reaction found with id given.' });
      }

      res.json({ message: 'The reaction has been deleted.' })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
