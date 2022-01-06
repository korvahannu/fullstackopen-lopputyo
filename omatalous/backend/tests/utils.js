const bcrypt = require('bcrypt');


const createQuickUser = async (name, isAdmin) => {

    const passwordHash = await bcrypt.hash(name, 10);

    const user = {
        username: name,
        name: name,
        email: `${name}@${name}.com`,
        passwordHash,
        admin: isAdmin
    };

    return user;
};

module.exports = { createQuickUser };