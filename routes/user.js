const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.json({ status: 'success', body: users });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('name', 'Name is Required')
      .not()
      .isEmpty(),
    check('email', 'Email is Required')
      .not()
      .isEmpty(),
    check('email', 'Invalid Email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'failed', errors: errors.array() });
    }

    try {
      const { name, email, roleType, mobile } = req.body;
      const status = true;
      const currentTime = new Date();
      const createdAt = currentTime;
      const updatedAt = currentTime;

      user = new User({
        name,
        email,
        roleType,
        mobile,
        status,
        createdAt,
        updatedAt
      });

      const mongoData = await user.save();

      res.json({
        status: 'success',
        body: { id: mongoData._id }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put(
  '/:id',
  [
    check('name', 'Name is Required')
      .not()
      .isEmpty(),
    check('email', 'Email is Required')
      .not()
      .isEmpty(),
    check('email', 'Invalid Email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'failed', errors: errors.array() });
    }

    try {
      const mongoID = req.params.id;
      let user = await User.findById(mongoID);

      const { name, email, roleType, mobile } = user;
      const upatedUser = req.body;
      const updateTime = new Date();

      user = {
        name: upatedUser.name || name,
        email: upatedUser.email || email,
        roleType: upatedUser.roleType || roleType,
        mobile: upatedUser.mobile || mobile,
        updatedAt: updateTime
      };

      await User.findByIdAndUpdate(mongoose.Types.ObjectId(mongoID), {
        $set: user
      });

      res.json({
        status: 'success',
        body: {
          id: mongoID,
          message: 'Updated'
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const mongoID = req.params.id;

    await User.findByIdAndRemove(mongoID);

    res.json({
      status: 'success',
      body: {
        id: mongoID,
        message: 'Deleted'
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
