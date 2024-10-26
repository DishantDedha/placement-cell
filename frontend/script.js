document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        console.log(email);
        const password = document.getElementById('signupPassword').value;
        console.log(password);

        try {
            const response = await fetch ('http://localhost:5002/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
           
            if (response.ok) {
                alert('User created successfully');
            } else {
                alert('Error creating user'+ data.error);
            }
        } catch (error) {
            alert(error);
        }
    });

    // Sign In
    document.getElementById('signinForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signinEmail').value;
        const password = document.getElementById('signinPassword').value;
        try {
            const response = await fetch('http://localhost:5002/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Signed in successfully');
            } else {
                alert('Error signing in');
            }
        } catch (error) {
            alert('Error signing in');
        }
    });
    // Add Student
    document.getElementById('addStudentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in first');
            return;
        }
        const student = {
            name: document.getElementById('studentName').value,
            college: document.getElementById('studentCollege').value,
            status: document.getElementById('studentStatus').value,
            dsascore: Number(document.getElementById('dsaScore').value),
            webdscore: Number(document.getElementById('webdScore').value),
            reactscore: Number(document.getElementById('reactScore').value)
        };
        try {
            const response = await fetch('http://localhost:5002/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(student)
            });
            const responseData = await response.json(); // Log response data
            if (response.ok) {
                alert('Student added successfully');
            } else {
                console.error('Error Response:', responseData);
        alert(`Error adding student: ${responseData.message || 'Unknown error'}`);
            }
        } catch (error) {
            
            alert('cannot add  student');
            console.log(token);
        }
    });
    // Load Students
    document.getElementById('loadStudents').addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in first');
            return;
        }
        try {
            const response = await fetch('http://localhost:5002/api/students', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            const students = data.users; // Access the `users` array here
            
            const studentList = document.getElementById('studentList');
            studentList.innerHTML = '';
            
           
                students.forEach(student => {
                    const li = document.createElement('li');
                    li.textContent = `${student.name} (${student.college}) - ${student.status}`;
                    studentList.appendChild(li);
                });
             
        } catch (error) {
            alert('Error loading students');
        }
    });
    // create interview
    document.getElementById('createInterviewForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in first');
            return;
        }
        const interview = {
            company: document.getElementById('companyName').value,
            date: document.getElementById('interviewDate').value
        };
        try {
            const response = await fetch('http://localhost:5002/api/interviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(interview)
            });
            if (response.ok) {
                alert('Interview created successfully');
            } else {
                alert('Error creating interview');
            }
        } catch (error) {
            alert('Error creating interview');
        }
    });
    // Load Interviews
    document.getElementById('loadInterviews').addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in first');
            return;
        }
        try {
            const response = await fetch('http://localhost:5002/api/interviews', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const interviews = await response.json();
            const interviewList = document.getElementById('interviewList');
            interviewList.innerHTML = '';
            interviews.forEach(interview => {
                const li = document.createElement('li');
                li.textContent = `${interview.company} (${new Date(interview.date).toLocaleDateString()})`;
                interviewList.appendChild(li);
            });
        } catch (error) {
            alert('Error loading interviews');
        }
    });
    // Allocate Student
    document.getElementById('allocateStudentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in first');
            return;
        }
        const allocation = {
            company: document.getElementById('allocateInterviewId').value,
            studentId: document.getElementById('allocateStudentId').value
        };
        try {
            const response = await fetch('http://localhost:5002/api/interviews/allocate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(allocation)
            });
            if (response.ok) {
                alert('Student allocated successfully');
            } else {
                alert('Error allocating student');
            }
        } catch (error) {
            alert('Error allocating student');
        }
    });
    // Mark Result
    document.getElementById('markResultForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in first');
            return;
        }
        const result = {
            company: document.getElementById('resultInterviewId').value,
            studentId: document.getElementById('resultStudentId').value,
            result: document.getElementById('resultStatus').value
        };
        try {
            const response = await fetch('http://localhost:5002/api/interviews/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(result)
            });
            if (response.ok) {
                alert('Result updated successfully');
            } else {
                alert('Error updating result');
            }
        } catch (error) {
            alert('Error updating result');
        }
    });
    // Load Jobs
    document.getElementById('loadJobs').addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:5002/api/jobs');
            const jobs = await response.json();
            const jobList = document.getElementById('jobList');
            jobList.innerHTML = '';
            jobs.forEach(job => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = job.url;
                a.textContent = job.title;
                a.target = '_blank';
                li.appendChild(a);
                jobList.appendChild(li);
            });
        } catch (error) {
            alert('Error loading jobs');
        }
    });
    // Download CSV
    document.getElementById('downloadCsv').addEventListener('click', () => {
        window.location.href = 'http://localhost:5002/api/csv';
    });


});