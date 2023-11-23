const express = require('express');
const postRouter = require('./posts.route')
const userRouter = require('./users.route')
const authRouter = require('./auth.route')
const logMdw = require('../middlewares/logger.mdw')
const router = express.Router();

router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/user', logMdw ,userRouter);

module.exports = router;
