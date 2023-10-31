import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.models';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response )=>{

    const {username,password}=req.body;

    const user = await User.findOne({where: {username:username}});

    if(user){
        return res.status(400).json({
            msg:`Ya existe un usuario con el nombre ${username}`
        })
    }


    const hashedPass = await bcrypt.hash(password,10);
 
    try {
        await User.create({
            username: username,
            password: hashedPass
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ups a ocurrido un error'
        })
    }

    res.json({
        msg:`usuario ${username} creado exitosamente`

    })
}
export const loginUser = async (req: Request, res: Response )=>{

    const {username,password} = req.body;

    const user: any = await User.findOne({where:{username:username}});
    if(!user){
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username}`
        })
    }

    const passwordValid = await bcrypt.compare(password,user.password)
    
    if(!passwordValid){
        return res.status(400).json({
            msg: `Password incorrecto`
        })
    }

    const token = jwt.sign({
        username: username
    },process.env.SECRET_KEY || 'loquesea')
    
    res.json({
        msg: ` bienvenido ${username}`,
        token
    })
}