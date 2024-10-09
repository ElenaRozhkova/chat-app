
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import { compare } from "bcrypt"
const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (email, userID) => {
    return jwt.sign({ email, userID }, process.env.JWT_KEY, { expiresIn: maxAge })
}
export const getUserInfo = async (request, response, next) => {
    try {
        const userData = await User.findById(request.userID)
        if (!userData) {
            return response.status(404).send("User not found")
        }

        return response.status(201).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        })

    }
    catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error");
    }
}

export const updateProfile = async (request, response, next) => {
    try {
        console.log("request")
        console.log(request)
        const { userID } = request
        const { firstName, lastName, color } = request.body;

        if (!firstName) {
            return response.status(400).send("User not found")
        }

        const userData = await User.findByIdAndUpdate(userID, {
            firstName, lastName, color, profileSetup: true
        }, { new: true, runValidators: true })


        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        })

    }
    catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error");
    }
}

export const signup = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email or Password is required")
        }
        const user = await User.create({ email, password })
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        })
        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup
            }
        })
    }
    catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error");
    }
}


export const signin = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).send("Email or Password is required")
        }
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send("User not found")
        }

        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(404).send("Password is incorrect.")
        }


        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None"
        })
        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        })
    }
    catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error");
    }
}