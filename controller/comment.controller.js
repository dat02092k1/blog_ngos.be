const db = require('../models')
const img = require('../service/imageHandle.js');     
const { validateUser } = require('../helpers/validateUser.js');     

const Comment = db.comments

// functions 
  
//1. Add Post

const addComment = async (req, res) => { 
    const { content, user_id, post_id } = req.body;
    try {
         
        const comment = await Comment.create({
            content, user_id, post_id
          });
         
          res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'internal server error' });
    }
}          


// 2. Get All Comments
const getComments = async (req, res) => { 
    try {
        const comments = await Comment.findAll(); 

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error find comments' });
    }
}

// 3. Get details comment 
const getDetailsComment = async (req, res) => { 
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) return res.status(404).json('comment not found');

        res.status(200).json(comment);

    } catch (error) {
        res.status(500).json({ error: 'Error find posts' });
    }
}

// 4. Edit comment
const editComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body; 
         
        const comment = await Comment.findByPk(id);
         
        if (!comment) {
            return res.status(404).json('cant find comment');
        }

        validateUser(req, res, comment.user_id);

        comment.content = content;
        await comment.save();

        res.status(200).json(comment);

    } catch (error) {
        res.status(500).json({ error: 'Cant find post' });
    }
}

// 5. Delete comment
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        
         // Find the comment by ID and delete it
        const comment = await Comment.findByPk(id);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        validateUser(req, res, comment.user_id);

        await comment.destroy();

        res.status(200).json('Delete succeffuly');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Cant find comment ' + error });
    }
}



module.exports = {
    addComment, getComments, getDetailsComment, editComment, deleteComment
}