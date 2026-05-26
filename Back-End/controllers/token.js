import jwt from "jsonwebtoken";

export const generateToken = (user)=>{
    const Token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}   
    )
    return Token;
}
