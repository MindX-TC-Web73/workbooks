const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
// app.use('/', function(req, res) {
//     var url = 'https://' +
//       req.get('host').replace('localhost:80', 'servername.domain:11121') + 
//       req.url
//     req.pipe(request({ qs:req.query, uri: url })).pipe(res);
//   })
const PORT = 3002;

const mockData = [
    {
        fullName: 'Vo Tuong Vi',
        gender: 'female'
    },
    {
        fullName: 'Duy Khanh',
        gender: 'male'
    }
]

app.get('/users', (req, res) => {
    res.json(mockData) // jsosn
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})