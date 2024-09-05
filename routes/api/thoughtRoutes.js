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
  async updateThought(req, res){
    try{
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId});

        if(!thought){
            return res.status(404).json({message: 'No thought found with id given.'});
        }

        res.json({message: 'The thought has been succesfully updated.'})
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
  },


  // Delete thought
  async deleteThought(req, res){
    try{
        const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

        if(!thought){
            return res.status(404).json({message: 'No thought found with id given.'});
        }

        res.json({message: 'The thought has been deleted.'})
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
  },
};
