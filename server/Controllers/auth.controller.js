import User from '../Models/user.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    //! First check if User already exist or not

    let user = await User.findOne({ email });
    if (user)
        return res.status(400).send({ message: "User with given email already exist ! Login Instead" });

    //! If User doesn't exist then create
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const newuser = await User({ username, email, password: hashPassword });
        await newuser.save();
        res.status(201).json({ status: 201, message: 'User is created successfully!' });
    } catch (error) {
        res.status(400).json({ status: 400, message: 'Internal Server Error', error: error });
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(401, 'Invalid Cridential !'));
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid Cridential !'));
        }
        // if the both email and password is correct we need to authenticate the user by adding cookie inside the browser we need to create the hash token that includes the email of the user or the id of the user, and we save the token inside the browser cookie. For this we will use jwt token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie(String(rest._id), token, { httpOnly: true });

        res.json({ message: "Login Sucessfully", status: 201, rest, token });
    }
    catch (error) {
        next(error);
    }
}

export const verifyToken = async (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        if (!cookies)
            return res.status(400).json({ message: "No cookie found" });

        const token = cookies.split("=")[1];
        if (!token) {
            return res.status(400).json({ message: "No token found" });
        }
        jwt.verify(String(token), process.env.JWT_SECRET, (error, user) => {
            if (error) {
                return res.status(400).json({ message: "Invalid Token", error });
            }
            req.id = user.id;
        });
        next();
    }
    catch (error) {
        res.status(401).send("Unauthorized: No token provided");
    }
};
export const getUser = async (req, res) => {
    const userId = req.id;
    try {
        const user = await User.findById(userId, "-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User varified successfully", user });
    } catch (error) {
        return res.json({ error });
    }
};



export const logout = (req, res) => {
    try {
        const cookies = req.headers.cookie;

        if (!cookies)
            return res.status(400).json({ message: "No Previous Cookie Found" });

        const prevToken = cookies.split("=")[1];

        if (!prevToken)
            return res.status(400).json({ message: "No Previous Token Found" });

        jwt.verify(String(prevToken), process.env.JWT_SECRET, (error, user) => {
            if (error) {
                return res.status(400).json({ message: "Authentication Failed", error });
            }

            res.clearCookie(String(`${user.id}`));
            req.cookies[String(`${user.id}`)] = "";

            return res.status(200).json({ message: "Successfully Logged Out", status: 200 });
        });
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided");
    }
}