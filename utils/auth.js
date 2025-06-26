import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Token is required' });
    }

    let token;
    if (authHeader.includes(' ')) {
        token = authHeader.split(' ')[1]; // Expecting format "Bearer <token>"
    } else {
        token = authHeader; // If no Bearer prefix, treat whole header as token
    }

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return next();
    } catch (err) {
        return res.status(403).json({ message: 'Token is not valid, or it is expired' });
    }
}
export {ensureAuthenticated}
