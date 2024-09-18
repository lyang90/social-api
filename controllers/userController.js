const { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get one user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update user
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with id given.' });
      }

      res.json({ message: 'User has been succesfully updated.' })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // Delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with id given.' });
      }

      res.json({ message: 'User has been deleted.' })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // create friends
  async createFriend(req, res) {
    try {
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );
      
      if (!friendData) {
        return res.status(404).json({ message: 'No user found with id given.' });
      }

      res.json(friendData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete friend
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: 'No user found with id given.' });
      }

      res.json({ message: 'The friend has been deleted.' })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
