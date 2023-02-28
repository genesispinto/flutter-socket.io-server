const { response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async (req, res = response) =>{

    const {email, password} = req.body;

    try{

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.json({
                ok:false,
                msg: 'Email ya existe'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();

        //Genesrar mi JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
            ok: true,
            usuario, 
            token
        });

    }catch(error){
        console.log(error);
        res.json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

   
}

const login = async (req, res = response) =>{

    const {email, password} = req.body;

    try{
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.json({
                ok:false,
                msg: 'email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password );
            if(!validPassword){
                return res.json({
                    ok:false,
                    msg: 'La contraseña no es valida'
                });
            }
        //Generar JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB, 
            token
        });

    }catch(error){
        console.log(error);
        return res.json({
            ok:false,
            msg: 'error en login'
        })
    
    }
}

const renewToken = async (req,res = response) => {

    //recuperar uid
    const uid = req.uid;

    //generar JWT
    const token = await generarJWT(uid);

    //Obtener el usuario por el uid
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario, 
        token
    });
}

module.exports = {
    crearUsuario,
    login, 
    renewToken
}