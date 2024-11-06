import { handleValidationError } from "../middlewares/errorHandler.js";
import { Admin } from "../models/adminRegisterSchema.js";
import { Student } from "../models/usersSchema.js";
import { Teacher } from "../models/usersSchema.js";

// Admin Register Function
export const adminRegister = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if an admin with the same email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Admin Sign-In Function
export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return handleValidationError("Please provide email and password", 400);
    }
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await existingAdmin.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Student Sign-In Function
export const studentSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return handleValidationError("Please provide email and password", 400);
    }

    const existingStudent = await Student.findOne({ email });
    if (!existingStudent) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await existingStudent.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      message: "Student signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Teacher Sign-In Function
export const teacherSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return handleValidationError("Please provide email and password", 400);
    }

    const existingTeacher = await Teacher.findOne({ email });
    if (!existingTeacher) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await existingTeacher.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};
