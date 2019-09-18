const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const port = 3001;

let tvShowArray = [
    {'show': 'bbt', 'year': '1992'},
    {'show': 'ghostbusters', 'year': '1990'},
    {'show': 'spongebob', 'year': '1994'}
]

app.use(bodyParser.json())

app.use((req, res,) => {
    res.send(tvShowArray)
})

app.route('/shows')
  .get(function (req, res) {
    res.status(200).send('File is good')
    res.send('Get a tv show')
  })
  .post(function (req, res) {
    tvShowArray.push(req.body)
    if(!tvShowArray){
        res.status().send('Internal Server Error')
    }
    res.send('Add a tv show')
  })
  .put(function (req, res) {
    res.status(200).send('Ok')
    res.send('Update the tv show')
  })
  .delete(function (req, res) {
    res.status(200).send('Ok')        
      res.send('deleted the tv show')
  })

// app.get('/shows', (req, res) => {
//     res.send(tvShowArray)
// })

// app.post('/shows', (req, res) => {
//     tvShowArray.push(req.body)
//     res.send(tvShowArray)
// })

// app.put('/shows', (req, res) => {
//     console.log(req.body)
//     res.send(tvShowArray)
// })

// app.delete('/shows', (req, res) => {
//     console.log(req.body)
//     res.send(tvShowArray)
// })


app.listen(port, () => console.log('running on port 3001'))