import User from "../model/userModel.js";

export const create = async (req, res) =>{
    try{
        const userData = new User(req.body);
        const {email} = userData;

        const userExist = await User.findOne({email}
            if(user)
        )
    } catch(error) {
        res.status(500).json({error: "Internal Server error."});
    }
}


export const fetch = async (requestAnimationFrame, res) =>{
    try{
        return res.json("Hello World");
    } catch(error) {
        res.status(500).json({error: "Internal Server error."});
    }
}