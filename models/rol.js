const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        require: [true, 'El rol es obliatorio']
    }
});

module.exports = model('Role', RoleSchema);