import express from 'express';
import {  newTeacher, getAllTeachers, updateTeacher } from '../controllers/teachersController.js';

const teacherRouter = express.Router();

teacherRouter
    .route('/')
    .get(getAllTeachers)
    .post(newTeacher);

      
teacherRouter
    .route('/:id')
    .patch(updateTeacher)




export default teacherRouter;
