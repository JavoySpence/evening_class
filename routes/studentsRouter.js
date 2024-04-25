// FILE: STUDENTROUTES.JS
// CREATED BY: JAVOY SPENCE
// DESCRIPTION: FILE TO HANDLE STUDENT ROUTES
// DATE CREATED: 16/4/2024
import express from 'express';
import { getAllStudents, searchStudents} from '../controllers/studentsController.js';


const studentRouter = express.Router();

studentRouter
      .route('/')
      .get(getAllStudents)
      .post(searchStudents);
      
      
studentRouter
    .route('/:id')
    // .get(getSingleStudent)




export default studentRouter;




