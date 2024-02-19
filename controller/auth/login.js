const zod = require('zod');
const User = require('./../../models/user');

const credentialSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(3)
});

const logIn = async (req, res) =>{
    try{
        const query = {email: req.query.email, password: req.query.password};
        const validator = credentialSchema.safeParse(query);

        if(!validator.success){
            return res.status(400).json({message: validator.error.message});
        }

        const resultLogin = await User.findOne(query);
        if(!resultLogin) return res.status(302).json({message: "User doesn't exist"});
        return res.status(200).json(resultLogin);

    } catch(error){
        console.log("error: ", error);
        const errorResponse = {message: error.message, code: error.code};
        return res.status(400).json(errorResponse);
    }
    
};

module.exports = logIn;