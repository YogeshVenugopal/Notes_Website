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
            return res.sendStatus(403); 
        }

        req.user = user;
        next();
    });
};

export default AuthenticationToken;
