import bcrypt from "bcryptjs"

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}

const comparepassword = async(password, dbpassword)=>{
    return bcrypt.compare(password, dbpassword);
}


export { hashPassword, comparepassword }