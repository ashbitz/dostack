require('dotenv').config();

const {PORT} = process.env;

if (!PORT) {
    throw new Error('El puerto no está definido');
}

module.exports = {
    PORT,
};