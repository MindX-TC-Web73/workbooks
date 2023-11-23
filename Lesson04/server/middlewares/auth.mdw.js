const jwt = require('jsonwebtoken');

const hanldeAuthMdw = (req, res, next) => {
    try {
        const {headers} = req;
    
        const token = headers['x-access-token'];

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        req.decode = decode;
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).json({msg: 'Token is not expired!'})
    }
}

/**
 * login -> key 
 */
module.exports = hanldeAuthMdw;