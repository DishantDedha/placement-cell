
import axios from 'axios';

export const fetchJobs = async (req, res) => {
    try {
        const githubJobs = await axios.get('https://remoteok.io/api');
       
        res.json(githubJobs.data);
    } catch (error) {
        res.status(400).send(error);
    }
};
