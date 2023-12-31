const db = require('../models')
var img = require('../service/imageHandle.js');     
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.users

const Post = db.posts
// functions
  
//1. Add user

const registerUser = async (req, res) => { 
    const { username, password, role, avatarUrl, public_id } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            username,     
            password: hashedPw, 
            role,
            avatarUrl,
            avt_publicId: public_id
          });
         
          res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error create user' });
    }
}          


// 2. Get All users
 
const getUsers = async (req, res) => { 
    try {
        const users = await User.findAll(); 

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: 'Error find tasks' });
    }
}

// 3. Get details user
const getDetailsUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json('cant find user');
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json('cant find user');
        }
        else {
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json({ error: 'Cant find user' });
    }
}

// 4. Edit user
const editUser = async (req, res) => {
    const { id } = req.params;
    const { username, role, avatarUrl, public_id } = req.body; 
    try {
         
        if (!id) {
            return res.status(400).json('cant find user');
        }
         
        const user = await User.findByPk(id);
        console.log(public_id);
        if (!user) {
            return res.status(404).json('cant find user');
        }
        console.log(user.avatarUrl);
        if (avatarUrl !== user.avatarUrl && avatarUrl !== undefined) {
            console.log(user.avt_publicId);
            img.deleteImageFromCloudinary(user.avt_publicId); 

            await user.update({
                username, 
                role, 
                avatarUrl, 
                avt_publicId: public_id
            })
            
            res.status(200).json(user);
        }
        else {
             await user.update({
                username, 
                role, 
                avatarUrl
            })

            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json({ error: 'Cant find user' });
    }
}

// 5. Delete user

const deleteUser = async (req, res) => { 
    const { id } = req.params;

    try {        
        const user = await User.findByPk(id);
      
        if (!user) {
            return res.status(404).json('cant find user');
        }
        
        if((user.avt_publicId)) {
        img.deleteImageFromCloudinary(user.avt_publicId);
        } 

        await user.destroy();

        res.status(200).json('delete task successfully');
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
}

// 6. user's posts
const getUserPosts = async (req, res) => {
    try {
        const id = req.params.id
 
        const posts = await User.findOne({
        include: [{
            model: Post,
            as: 'post'
        }],
        where: { id: id }
    }) 

    res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({ error: 'internal server error' });
    }
}

module.exports = {
    registerUser,
    getUsers,
    getDetailsUser, 
    editUser, 
    deleteUser,
    getUserPosts  
}