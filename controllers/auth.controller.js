const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async(req = request, res = response) => {
    const {correo, password} = req.body;

    try {

        //verificar email

        const usuario = await Usuario.findOne({correo});

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //verificar si el usuario está activo

        if (!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto: estado: false'
            });
        }

        //verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto: password'
            });
        }

        //generar JWT
        
        res.json({
            msg: 'login post ok'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    login
}