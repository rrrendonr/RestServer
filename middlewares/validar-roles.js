const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token'
        })
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: `${nombre} no es tiene rol - no puede hacer esto`
        })
    }
    next();
}

const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {
        
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token'
        })
    }

    if (!roles.includes(req.usuario.rol)) {
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${roles}`
        })
    }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}