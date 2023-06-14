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
const comment = require('./routes/comment.js');
const auth = require('./routes/auth.js');

app.use('/api/product', router);
app.use('/api/user', user);
app.use('/api/img', upload);
app.use('/api/post', post);
app.use('/api/comment', comment);
app.use('/api/auth', auth);

// middleware
 
app.use(cors(corOptions))

 
app.use(express.urlencoded({ extended: true }));

// testing api
app.get('/', (req, res) => {
    const text = "RestAPI for Ngos Blog with: User, Post, Comment, Products";
    res.send(text);
})

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})