const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3001;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mcooper72:qwertyuiop@cluster0-nez49.mongodb.net/admin?retryWrites=true&w=majority";
const instance = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true});

// let tvShowArray = [
//   {"firstname": "maurice",
//     "lastname": "cooper"}
// ]

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'application/json, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

instance.connect((err, client) => {
  if(err){
    console.log(err)
  }
  const collection = client.db("tvdemoapi").collection("tvdemoapi")
  app.post('/tvDemo', (req, res)=> {
    res.send(req.body)
  })
  app.get('/tv-demo-api', async (req, res) => {
     const data = await collection.find().toArray()
     res.send(data)
})

// app.get('/', (req, res) => {
//   instance.connect((err, client) => {
//     if(err) res.send(err)
//     const collection = client.db("tv-demo-api").collection("tvdemo")
//     collection.find().toArray().then(r => res.send(r))
//   })
// })

// app.route('/shows')
//   .get(function (req, res) {
//     res.status(200).send('File is good')
//     res.send('Get a tv show')
//   })
//   .post(function (req, res) {
//     tvShowArray.push(req.body)
//     if(!tvShowArray){
//         res.status().send('Internal Server Error')
//     }
//     res.send('Add a tv show')
//   })
//   .put(function (req, res) {
//     res.status(200).send('Ok')
//     res.send('Update the tv show')
//   })
//   .delete(function (req, res) {
//     res.status(200).send('Ok')        
//       res.send('deleted the tv show')
//   })

  app.get('/find', (req, res) => {
    instance.connect({_id: req.params.id}).then((data) => {
      res.send(data)
      db.close()
    })
  })


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

})
app.listen(port, () => console.log('running on port 3001'))