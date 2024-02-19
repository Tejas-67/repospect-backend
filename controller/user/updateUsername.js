const zod = require('zod');
const User = require('../../models/user');

const inputSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    newUsername: zod.string().min(3)
});

const updateUsername = async (req, res)=>{
    try{
        const userData = {
            email: req.query.email,
            password: req.query.password,
            newUsername: req.query.newUsername
        };

        const validator = inputSchema.safeParse(userData);
        if(!validator.success){
            return res.status(400).json({message: validator.error.message});
        }
        const query = {email: userData.email, password: userData.password};
        const updateUsernameResult = await User.findOne(query);
        if(updateUsernameResult==null) return res.status(400).json({message: "Couldn't find user"});
        
        updateUsernameResult.name = userData.newUsername;
        const updatedUser = await updateUsernameResult.save();
        return res.status(200).json(updatedUser);

    }catch(error){
        console.log("error in change username controller: ", error);
        const errorResponse = {message: error.message, code: error.code};
        res.status(400).json(errorResponse);
    }
}

module.exports = updateUsername;