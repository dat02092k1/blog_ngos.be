const db = require('../models')
var img = require('../service/imageHandle.js');     

const Post = db.posts
const Comment = db.comments

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


// 2. Get All posts
const getPosts = async (req, res) => { 
    try {
        const posts = await Post.findAll(); 

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ error: 'Error find posts' });
    }
}

// 3. Get details post 
const getDetailsPost = async (req, res) => { 
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json('post not found');

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: 'Error find posts' });
    }
}

// 4. Edit post
const editPost = async (req, res) => {
    const { id } = req.params;
    const { title, content, imageUrl, public_id } = req.body; 
    try {
         
        if (!id) {
            return res.status(400).json('Post ID is missing');
        }
         
        const post = await Post.findByPk(id);
         
        if (!post) {
            return res.status(404).json('cant find post');
        }
        console.log(post.imageUrl);

        if (imageUrl !== post.imageUrl && imageUrl !== undefined && post.imageUrl !== null) {
            if (post.public_id) {
                img.deleteImageFromCloudinary(post.public_id);
            }
            
                /// !imgUrl => !public_id or imgUrl !== 
                /// => !public_id or public_id !==            
        }
             await post.update({
                title, 
                content,
                imageUrl, 
                public_id
            })

            res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: 'Cant find post' });
    }
}

// 5. Delete post
const deletePost = async (req, res) => { 
    const { id } = req.params;
                                
    try {        
        const post = await Post.findByPk(id);
          
        if (!post) {
            return res.status(404).json('cant find post');
        }
        
        if((post.public_id)) {
        img.deleteImageFromCloudinary(post.public_id);
        } 

        await post.destroy();

        res.status(200).json('delete post successfully');
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
    }
}

// 6. comments in the post
const getCommentsPost = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        
        const comments = await Post.findOne({
        include: [{
            model: Comment,
            as: 'comment'
        }],
        where: { id: id }
    }) 

    res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({ error: 'internal server error' });
    }
}
module.exports = {
    addPost, getPosts, getDetailsPost, editPost, deletePost, getCommentsPost
}