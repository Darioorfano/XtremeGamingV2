const userRepository = require('../repositories/userRepository');


const login = async () => {
    const user = await userRepository.login();

    return user;
}

const register= async () => {
    const userRegister = await userRepository.register();
    return userRegister;
}


module.exports = {
    login,
    register
};