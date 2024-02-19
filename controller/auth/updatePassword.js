const User = require('./../../models/user');
const zod = require('zod');

const userSchema = zod.object({
    email: zod.string().email(),
    currentPassword: zod.string(),
    newPassword: zod.string().min(8)
});

const updatePassword = async (req, res)=>{
    try{
        const userInput = {
            email: req.query.email,
            currentPassword: req.query.currentPassword,
            newPassword: req.query.newPassword
        };

        const validatorResult = userSchema.safeParse(userInput);
        if(!validatorResult) return res.status(400).json({message: validatorResult.error.message});

        const query = {
            email: userInput.email,
            password: userInput.currentPassword
        };

        const resultUpdatePassword = await User.findOne(query);
        if(!resultUpdatePassword){
            return res.status(302).json({message: "User doesn't exist"});
        }
        else{
            resultUpdatePassword.password = userInput.newPassword;
            const updatedResult = await resultUpdatePassword.save();
            return res.status(200).json(updatedResult);
        }
    }catch(error){
        console.log("error in update password controller: ", error);
        const errorResponse = {message: error.message, code: error.code};
        return res.status(400).json(errorResponse);
    }
};

module.exports = updatePassword;