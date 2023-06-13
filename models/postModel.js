module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,  
            allowNull: true 
        },  
        public_id: { 
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    return Post
}