const express = require('express');
const cors = require('cors');

const app = express();

var corOptions = {
    origin: 'http://localhost:8000'
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
const router = require('./routes/product.js');
const user = require('./routes/user.js');
const upload = require('./routes/upload.js');
const post = require('./routes/post.js');

app.use('/api/product', router);
app.use('/api/user', user);
app.use('/api/img', upload);
app.use('/api/post', post);

// middleware
 
app.use(cors(corOptions))

 
app.use(express.urlencoded({ extended: true }));

// testing api
app.get('/', (req, res) => {
    res.json({ message: 'heh api'})
})

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})