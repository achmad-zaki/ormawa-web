const { PrismaClient } = require('@prisma/client');


const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }


        req.user = user;
        next(); 
      });

    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  }
  