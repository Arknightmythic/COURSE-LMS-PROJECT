import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { deleteStudent, getDetailStudents, getStudents, postStudents, updateStudents } from "../controller/StudentController.js";
import { fileFilter, fileStorage } from "../utils/multer.js";
import multer from "multer";

const studentRoutes = express.Router()

const upload = multer({
    storage: fileStorage('students'),
    fileFilter
})

studentRoutes.get("/student", verifyToken, getStudents)
studentRoutes.get("/student/:id", verifyToken, getDetailStudents)
studentRoutes.post("/student", verifyToken, upload.single('avatar'), postStudents)
studentRoutes.put("/student/:id", verifyToken, upload.single('avatar'), updateStudents)
studentRoutes.delete("/student/:id", verifyToken, deleteStudent)
export default studentRoutes
