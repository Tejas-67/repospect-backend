const User = require("../../models/user");
const zod = require('zod');

const userSchema = zod.object({
    name: zod.string().min(3),
    email: zod.string().email(),
    password: zod.string().min(1),
    image: zod.string()
});

const signUp = async (req, res) => {
    try{

        const userInfo = {
            name: req.query.name,
            email: req.query.email,
            password: req.query.password,
            image: req.query.image
        };
        const result = userSchema.safeParse(userInfo);
        
        if(!result.success){
            return res.status(400).json({message: "Input data is incorrect"});
        }

        const user = new User(userInfo);
        const query = {email: userInfo.email};
        const dbResponse = await User.findOne(query);

        if(!dbResponse){
            const dbSaveResponse = await user.save();
            console.log('user, ', dbSaveResponse);
            return res.status(200).json(dbSaveResponse);
        }else{
            return res.status(302).json({message: "Email already exists"});
        }

    }catch(error){
        console.log("error in signup controller: ", error);
        const errorResponse = {message: error.message, code: error.code};
        return res.status(400).json(errorResponse);
    }
}

module.exports = signUp;