const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSingIn = async(req = request, res = response) => {
    const {id_token} = req.body;

    try {
        const {nombre, img, correo} = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            //crear
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Usuario en DB
        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }
}


module.exports = {
    login,
    googleSingIn
}