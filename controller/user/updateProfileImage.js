const zod = require('zod');
const User = require('../../models/user');

const inputSchema = zod.object({
    email: zod.string().email(),
    newImageUrl: zod.string().url()
});

const updateProfileImage = async (req, res)=>{
    try{
        const inputData = {
            email: req.query.email,
            newImageUrl: req.query.newImageUrl
        };

        const validator = inputSchema.safeParse(inputData);
        if(!validator){
            return res.status(400).json({message: validator.error.message});
        }
        const query = {email: inputData.email};
        const user = await User.findOne(query);
        if(!user){
            res.status(302).json({message: "User doesn't exist"});
        }
        user.image = inputData.newImageUrl;
        const updatedUser = await user.save();

        return res.status(200).json(user);
    }catch(error){
        console.log("error at update profile controller: ", error);
        const errorResponse = {message: error.message, code: error.code};
        return res.status(400).json(errorResponse);   
    }
}

module.exports = updateProfileImage; 