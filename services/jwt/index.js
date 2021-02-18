const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), "UTF-8");

function createToken(data) {
  return jwt.sign({ ...data }, privateKey, { expiresIn: '7 days' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, privateKey)
  } catch (e) {
    return e
  }
}

module.exports = {
  createToken,
  verifyToken
}