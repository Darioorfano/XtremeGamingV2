const userService = require("../services/userService");

const login = async(req,res) =>{
    try{
        const user = await userService.login();
        res.json(user);
    }catch(error){
        res.status(401).json({ error: 'Usuario u contraseña incorrecta' });
    }
}

const register = async(req,res) =>{
    try{
        const user = await userService.register();
        res.json(user);
    }catch(error){
        res.status(401).json({ error: 'Usuario ya registrado' });
    }
}

module.exports = {
    login
}