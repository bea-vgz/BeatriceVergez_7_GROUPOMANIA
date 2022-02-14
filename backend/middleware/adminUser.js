const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
		const currentUserId = req.params.id;

		if ((isAdmin !== true) && (userId != currentUserId)){
            res.status(403).json({ message: "Requête non authentifiée" });
		} else {
			next();
		}
	} catch {
		res.status(401).json({error:error});
	}
};