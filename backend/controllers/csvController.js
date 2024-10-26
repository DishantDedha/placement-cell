import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import Interview from '../models/interviewModel.js';

export const downloadCSV = async (req, res) => {
    try {
        const interviews = await Interview.find({}).populate('students results.student');
        const records = interviews.flatMap(interview =>
            interview.results.map(result => ({
                studentId: result.student._id,
                studentName: result.student.name,
                studentCollege: result.student.college,
                studentStatus: result.student.status,
                dsaScore: result.student.dsascore,
                webdScore: result.student.webdscore,
                reactScore: result.student.reactscore,
                interviewDate: interview.date,
                interviewCompany: interview.company,
                interviewStudentResult: result.result
            }))
        );
        const csvWriter = createObjectCsvWriter({
            path: path.resolve('data.csv'),
            header: [
                { id: 'studentId', title: 'Student ID' },
                { id: 'studentName', title: 'Student Name' },
                { id: 'studentCollege', title: 'Student College' },
                { id: 'studentStatus', title: 'Student Status' },
                { id: 'dsaScore', title: 'DSA Final Score' },
                { id: 'webdScore', title: 'WebD Final Score' },
                { id: 'reactScore', title: 'React Final Score' },
                { id: 'interviewDate', title: 'Interview Date' },
                { id: 'interviewCompany', title: 'Interview Company' },
                { id: 'interviewStudentResult', title: 'Interview Student Result' },
            ],
        });

        await csvWriter.writeRecords(records);
        console.log('CSV file has been written successfully.');

        res.download(path.resolve('data.csv'), (err) => {
            if (err) {
                console.error('Error downloading the file:', err);
                return res.status(500).json({ error: 'Failed to download CSV' });
            }
        });
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to generate CSV' });
    }
};