const validateUser = (req, res, user_id) => {
    if (user_id !== req.user.id) {
        return res.status(403).json({ error: 'You are not authorized to take this action' });
      }
}

module.exports = {
    validateUser
}