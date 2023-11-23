const express = require('express');
const usersData = require('./../mock/users.mock')
const router = express.Router();
const authMdw = require('../middlewares/auth.mdw');

router.get('/all', (req, res) => {
    return res.json({msg: 'sucess', data: usersData})
})
router.get('/search', (req, res) => {
    const {query} = req;
    const findData = usersData.filter(
        user => user.uname.indexOf(query.key)  !== -1
        || user.fname.indexOf(query.key) !== -1
    )
    return res.json({msg: 'sucess', data: findData})
})


router.use(authMdw)

router.post('/create', (req, res) => {  
    console.log(req.role) // req.prams | req.query

    const {body, decode} = req;
    const {role} = decode;
    if (role === 'guest') {
        return res.status(503).json({msg: 'Not permission!'})
    }
    if (role === 'admin') {
        usersData.push({uname: body.uname, fname: body.fname, role: body.role, pwd: body.pwd});
        return res.status(200).json({msg: 'sucess', data: usersData})
    }
    return res.status(404).json({msg: 'Not determined!'})
})

router.put('/update/:uname', (req, res) => {
    const {body, params} = req;
    console.log(params)
    let index = usersData.findIndex((user) => user.uname === params.uname);
    if (index === -1) {
        return res.status(404).json({msg: 'fail'})
    }
    usersData[index] = {
        ...usersData[index],
        ...body
    }
    return res.json({msg: 'sucess', data: usersData})
})

router.delete('/del/:uname', (req, res) => {
    const {params} = req;
    let index = usersData.findIndex((user) => user.uname === params.uname);
    if (index === -1) {
        return res.status(404).json({msg: 'fail'})
    }
    usersData.splice(index, 1);
    return res.json({msg: 'success', data: usersData})
})

module.exports = router;