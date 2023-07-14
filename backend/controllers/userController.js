const userService = require("../services/userService");

const login = async (req,res) =>{
    try{
        const {email, password } = req.body;
        const result = await userService.login(email, password);
        res.status(result.code).json({ mensaje: result.mensaje, usuario: result.user });
    }catch(error){
        res.status(500).json(error);
    }
}

const register = async(req,res) =>{
    try{
        const {email, password, name } = req.body;
        const result = await userService.register(email, password, name);
        res.status(result.code).json({ mensaje: result.mensaje });
    }catch(error){
        res.status(500).json(error);
    }
}

module.exports = {
    login,
    register
}