// // 1.Main code

// // src/server/controllers/userController.ts

// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config(); // Ensure dotenv is called at the top of your server entry

// import User from "../models/User.js"; // Assuming the model is typed properly

// // Type definitions for the environment variables (if you're using TypeScript with Node.js)
// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       JWT_SECRET: string;
//       JWT_EXPIRES_IN: string;
//     }
//   }
// }

// // Utility to safely get required env variables
// const getEnvVar = (key: string, fallback?: string): string => {
//   const value = process.env[key];
//   if (!value && !fallback) {
//     throw new Error(`Missing environment variable: ${key}`);
//   }
//   return value || fallback!;
// };

// export const createUser = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { fullname, email, password, role, location, dateOfBirth, phoneNo } =
//       req.body;

//     // Check all required fields
//     if (
//       !fullname ||
//       !email ||
//       !password ||
//       !role ||
//       !location ||
//       !dateOfBirth ||
//       !phoneNo
//     ) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "User with this email already exists." });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(password, salt);

//     // Create new user
//     const newUser = new User({
//       fullname,
//       email,
//       passwordHash,
//       role,
//       location,
//       dateOfBirth,
//       phoneNo,
//     });

//     await newUser.save();

//     return res
//       .status(201)
//       .json({ message: "User created successfully.", userId: newUser._id });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({ message: "Internal Server Error." });
//   }
// };

// // --- Existing createUser is already here --- //

// export const loginUser = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res
//         .status(400)
//         .json({ message: "Email, password, and role are required." });
//     }

//     const user = await User.findOne({ email, role });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     // ✅ Generate JWT Token
//     // Assuming JWT_SECRET and JWT_EXPIRES_IN are set in the .env file

//     // Load environment variables safely
//     const jwtSecret = getEnvVar("JWT_SECRET");
//     const jwtExpiresIn = getEnvVar("JWT_EXPIRES_IN", "7d");

//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//       jwtSecret,
//       {
//         expiresIn: jwtExpiresIn, // Ensure expiresIn is correctly handled
//       }
//     );

//     return res.status(200).json({
//       message: "Login successful.",
//       token,
//       user: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         role: user.role,
//         location: user.location,
//       },
//     });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     return res.status(500).json({ message: "Internal Server Error." });
//   }
// };

// 2. capgeminie code

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken"; // Import SignOptions and StringValue
import type { StringValue } from "ms";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || fallback!;
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { fullname, email, password, role, location, dateOfBirth, phoneNo } =
      req.body;

    // Check all required fields
    if (
      !fullname ||
      !email ||
      !password ||
      !role ||
      !location ||
      !dateOfBirth ||
      !phoneNo
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullname,
      email,
      passwordHash,
      role,
      location,
      dateOfBirth,
      phoneNo,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully.", userId: newUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

//Login of existing user.

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password, and role are required." });
    }

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const jwtSecret = getEnvVar("JWT_SECRET");
    const jwtExpiresIn: string = getEnvVar("JWT_EXPIRES_IN", "7d");

    const signOptions: SignOptions = {
      expiresIn: jwtExpiresIn as StringValue, // Explicitly cast to StringValue
    };

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      signOptions
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        location: user.location,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

//get user based on their Role.
export const getUsersByRole = async (req: Request, res: Response) => {
  const { role } = req.query;

  if (!role || (role !== "farmer" && role !== "broker")) {
    return res
      .status(400)
      .json({ error: "Invalid or missing role query parameter" });
  }

  try {
    const users = await User.find({ role });
    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//Routes for chatting
// controllers/userController.ts

// @desc Get all brokers
export const getAllBrokers = async (req: Request, res: Response) => {
  try {
    const brokers = await User.find({ role: "broker" }).select("-password");
    res.status(200).json(brokers);
  } catch (err) {
    console.error("Error fetching brokers:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get all farmers
export const getAllFarmers = async (req: Request, res: Response) => {
  try {
    const farmers = await User.find({ role: "farmer" }).select("-password");
    res.status(200).json(farmers);
  } catch (err) {
    console.error("Error fetching farmers:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
