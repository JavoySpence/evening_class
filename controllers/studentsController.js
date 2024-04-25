import { pool } from '../database/dbConnection.js';

export const getAllStudents = async (req, res, next) => {
    try {
        const [students] = await pool.query('SELECT * FROM students');

        res.status(200).json({
            status: 'success',
            results: students.length,
            data: { students }
        });
    } catch (error) {
        next(error); // Pass the error to Express error handler
    }
};
export const searchStudents = async (req, res, next) => {
    try {
        const searchTerm = req.query.searchTerm || '';

        if (searchTerm.trim() === '') {
            return res.status(400).json({
                status: 'error',
                message: 'Search term is required',
            });
        }

        // Split the search term into first name and last name
        const names = searchTerm.split(' ');
        const firstName = names[0] || '';
        const lastName = names.length > 1 ? names[1] : '';

        // Execute the query with the separated first name and last name
        const [students] = await pool.query(
            'SELECT * FROM students WHERE first_name LIKE ? AND last_name LIKE ?',
            [`%${firstName}%`, `%${lastName}%`]
        );

        // Return the results in the response
        res.status(200).json({
            status: 'success',
            results: students.length,
            data: students,
        });
    } catch (error) {
        console.error('Error searching students:', error);
        next(error);
    }
};











// export const deleteSingleStudent = async (req, res, next) => {
//    try {
//        const id = parseInt(req.params.id);
//        if (isNaN(id) || id <= 0) {
//            return res.status(400).json({ status: 'error', message: 'Invalid student ID' });
//        }

//        const sqlQuery = 'DELETE FROM students_info WHERE id = ?';
//        const [result] = await pool.query(sqlQuery, [id]);

//        if (result.affectedRows === 0) {
//            return res.status(404).json({ status: 'error', message: 'Student not found' });
//        }

//        res.status(200).json({
//            status: 'success',
//            message: 'Student deleted successfully'
//        });
//    } catch (error) {
//        console.error('Error deleting student:', error);
//        res.status(500).json({ status: 'error', message: 'An error occurred while deleting the student' });
//    }
// };

// export const updateStudent = async (req, res, next) => {
//    const studentData = {
//        id: parseInt(req.params.id),
//        first_name: req.body.first_name,
//        last_name: req.body.last_name,
//        phone: req.body.phone
//    };

//    console.log('Received id:', studentData.id); 

//    const sqlQuery = 'UPDATE students_info SET first_name = ?, last_name = ?, phone = ? WHERE id = ?';

//    try {
//        await pool.query(sqlQuery, [studentData.first_name, studentData.last_name, studentData.phone, studentData.id]);
       
//        res.status(200).json({ 
//            status: 'success', 
//            message: 'Student updated successfully' 
//        });
//    } catch (error) {
//        console.error('Error updating student:', error);
       
//        res.status(500).json({ 
//            status: 'error', 
//            message: 'An error occurred while updating the student' 
//        });
//    }
// };
