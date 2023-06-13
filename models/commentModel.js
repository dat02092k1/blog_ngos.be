module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Comment;
};
