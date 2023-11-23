const express = require('express');
const usersData = require('./../mock/users.mock')
const router = express.Router();
const authMdw = require('../middlewares/auth.mdw');
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
    try {
        // Lấy data đăng nhập từ body request
        const {uname, pwd} = req.body;

        // Check người dùng có tồn tại trong hệ thống?
        let findUser = usersData.find((user) => user.uname === uname && user.pwd === pwd);

        if (!findUser) {
            return res.status(404).json({msg: 'User is not found!'});
        }

        const payload = {
            uname: findUser.uname,
            role: findUser.role,
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '60s' })

        console.log(token)
        return res.json({
            msg: 'Login successfully!',
            token: token
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;