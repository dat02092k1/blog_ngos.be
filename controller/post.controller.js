const db = require('../models')
var img = require('../service/imageHandle.js');     

const Post = db.posts

// functions
  
//1. Add Post

const addPost = async (req, res) => { 
    const { title, content, imageUrl, public_id } = req.body;
    const { id } = req.params;
    try {
        console.log(title, content, imageUrl, public_id);
        const post = await Post.create({
            title,
            content,
            imageUrl,
            public_id,
            user_id: id,
          });
         
          res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error create user' });
    }
}          


// 2. Get All users
 


// 3. Get details user


// 4. Edit user


// 5. Delete user

module.exports = {
    addPost
}