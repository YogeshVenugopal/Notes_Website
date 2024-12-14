import jwt from "jsonwebtoken";

const AuthenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401); // Unauthorized if no token
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403); // Forbidden if token verification fails
        }

        req.user = user;
        console.log('Token verified, user:', user);  // Log the decoded user info
        next();
    });
};

export default AuthenticationToken;
