import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { mutateStudentSchema } from "../utils/schema.js";
import courseModel from "../models/courseModel.js";
import path from "path";
import fs from "fs";
export const getStudents = async (req, res) => {
  try {
    const student = await userModel
      .find({
        role: "student",
        manager: req.user._id,
      })
      .select("name courses photo");
    const photoUrl = process.env.APP_URL + "/uploads/students/";
    const response = student.map((item) => {
      return {
        ...item.toObject(),
        photo_url: photoUrl + item.photo,
      };
    });

    return res.json({
      message: "Successfull Get student",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getDetailStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await userModel.findById(id).select('name email photo');
    const photoUrl = process.env.APP_URL + "/uploads/students/";
    
    return res.json({
      message: "get detail student succesfull",
       data: {
        ...student.toObject(),
        photo_url: photoUrl + student.photo,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const postStudents = async (req, res) => {
  try {
    const body = req.body;

    const parse = mutateStudentSchema.safeParse(body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);

      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }

      return res.status(500).json({
        message: "Error",
        data: null,
        errors: errorMessages,
      });
    }

    const hashpassword = bcrypt.hashSync(body.password, 12);
    const student = new userModel({
      name: parse.data.name,
      email: parse.data.email,
      password: hashpassword,
      photo: req.file?.filename,
      manager: req.user?._id,
      role: "student",
    });

    await student.save();

    return res.json({
      message: "create student succesfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const updateStudents = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const parse = mutateStudentSchema
      .partial({ password: true })
      .safeParse(body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);

      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }

      return res.status(500).json({
        message: "Error",
        data: null,
        errors: errorMessages,
      });
    }
    const student = await userModel.findById(id);
    const hashpassword = parse.data?.password
      ? bcrypt.hashSync(parse.data.password, 12)
      : student.password;
    await userModel.findByIdAndUpdate(id, {
      name: parse.data.name,
      email: parse.data.email,
      password: hashpassword,
      photo: req?.file ? req.file?.filename : student.photo,
    });

    return res.json({
      message: "Update student succesfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await userModel.findById(id);
    await courseModel.findOneAndUpdate(
      {
        students: id,
      },
      {
        $pull: {
          students: id,
        },
      }
    );

    const dirname = path.resolve();

    const filePath = path.join(
      dirname,
      "public/uploads/students",
      student.photo
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await userModel.findByIdAndDelete(id);
    return res.json({
      message: "Delete student succesfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
