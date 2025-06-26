import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//validate req.body
//create mongodb usermodel
//do password encryption
//save data to mongodb
//return response to client
const registerUser = async (req, res) => {
    const userModel = new UserModel(req.body)
    userModel.password = await bcrypt.hash(req.body.password, 10)
    try {
        const response = await userModel.save();
        response.password = undefined;
        return res.status(201).json({ message: 'success', data: response })
    } catch (err) {
        return res.status(500).json({ message: 'error', err })
    }
    res.send('Register success')
};

//check user using email
//compare password
//create jwt token
//send response to client

const loginUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ message: 'Auth failed,Invalid username/password' })
        }
        const isPassEqual = await bcrypt.compare(req.body.password, user.password)
        if (!isPassEqual) {
            return res.status(401).json({ message: 'Auth failed,Invalid username/password' })
        }
        const tokenObject = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
        const jwtToken = jwt.sign(tokenObject, process.env.SECRET, { expiresIn: '4h' });
        return res.status(200).json({ jwtToken, tokenObject })
    } catch (err) {
        return res.status(500).json({ message: 'error', err });
    }

};
//{password:0} = this is called projection , it means when we sed user response we will not get the password 
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({},{password:0});
        return res.status(200).json({data:users});
    } catch (err) {
        return res.status(500).json({ message: 'error ', err });
    }
};

export { registerUser, loginUser, getUsers };   