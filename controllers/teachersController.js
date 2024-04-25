import { pool } from '../database/dbConnection.js';

export const newTeacher = async (req, res, next) => {
    const teachersData = new Object();
    teachersData.first_name = req.body.first_name;
    teachersData.last_name = req.body.last_name;
    teachersData.subject = req.body.subjects;
    teachersData.phone_number = req.body.phone_number; 
    teachersData.email = req.body.email; 
 
    
    const sqlQuery = 'INSERT INTO teachers (first_name, last_name, subject, phone_number, email) VALUES (?, ?, ?, ?, ?)';
 
    try {
        await pool.query(sqlQuery, [teachersData.first_name, teachersData.last_name, teachersData.subject, teachersData.phone_number, teachersData.email]);
 
        res.status(200).json({
            status: 'success',
            message: 'Teacher added successfully' 
        });
    } catch (error) {
        console.error('Error adding teacher:', error); 
 
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while adding the teacher'
        });
    }
 };


 export const getAllTeachers = async (req, res, next) => {
    try {
        const [students] = await pool.query('SELECT * FROM teachers');

        res.status(200).json({
            status: 'success',
            results: students.length,
            data: { students }
        });
    } catch (error) {
        next(error); 
    }
};

export const updateTeacher = async (req, res, next) => {
    const teacherData = {
        id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        subject: req.body.subject,
        phone_number: req.body.phone_number,
        email: req.body.email
    };

    const sqlQuery = 'UPDATE teachers SET first_name = ?, last_name = ?, subject = ?, phone_number = ?, email = ? WHERE id = ?';

    try {
        await pool.query(sqlQuery, [teacherData.first_name, teacherData.last_name, teacherData.subject, teacherData.phone_number, teacherData.email, teacherData.id]);
        
        res.status(200).json({
            status: 'success',
            message: 'Teacher updated successfully'
        });
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while updating the teacher'
        });
    }
};




 
 