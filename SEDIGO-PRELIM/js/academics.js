// Academics JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Academic programs data
    const programsData = {
        cs: {
            id: "cs",
            name: "Computer Science",
            description: "Our Computer Science program provides a comprehensive education in computing fundamentals, software development, algorithms, and data structures. Students gain hands-on experience with modern programming languages and development tools while developing problem-solving skills applicable to diverse technological challenges.",
            duration: "4 years",
            degree: "Bachelor of Science",
            credits: "120 credits",
            highlights: [
                "Comprehensive curriculum covering algorithms, data structures, and software engineering",
                "Specializations available in AI, Software Engineering, and Systems",
                "Hands-on projects and internships with industry partners",
                "Active research opportunities with faculty mentors",
                "Preparation for graduate studies and industry careers"
            ],
            curriculum: [
                { year: "1", courses: ["Introduction to Programming", "Discrete Mathematics", "Computer Systems", "Calculus I"] },
                { year: "2", courses: ["Data Structures & Algorithms", "Object-Oriented Design", "Computer Networks", "Database Systems"] },
                { year: "3", courses: ["Operating Systems", "Software Engineering", "Theory of Computation", "Elective Specialization"] },
                { year: "4", courses: ["Capstone Project", "Advanced Electives", "Professional Ethics", "Senior Seminar"] }
            ]
        },
        cyber: {
            id: "cyber",
            name: "Cybersecurity",
            description: "The Cybersecurity program prepares students to protect digital assets and infrastructure from threats. Students learn about network security, cryptography, ethical hacking, digital forensics, and risk management while developing the technical and analytical skills needed for careers in information security.",
            duration: "4 years",
            degree: "Bachelor of Science",
            credits: "120 credits",
            highlights: [
                "Hands-on training in secure coding and ethical hacking",
                "State-of-the-art cybersecurity lab with isolated network",
                "Industry certifications preparation (CompTIA Security+, CEH)",
                "Internships with government agencies and private sector",
                "Participation in national cybersecurity competitions"
            ],
            curriculum: [
                { year: "1", courses: ["Introduction to Cybersecurity", "Networking Fundamentals", "Programming for Security", "Discrete Math"] },
                { year: "2", courses: ["Cryptography", "Network Defense", "Operating System Security", "Digital Forensics Fundamentals"] },
                { year: "3", courses: ["Ethical Hacking", "Incident Response", "Risk Management", "Web Application Security"] },
                { year: "4", courses: ["Capstone Security Project", "Cyber Law & Ethics", "Advanced Penetration Testing", "Security Operations"] }
            ]
        },
        data: {
            id: "data",
            name: "Data Science",
            description: "Our Data Science program combines statistical analysis, machine learning, and computational techniques to extract insights from complex data. Students learn to manage, analyze, and visualize data while developing the skills needed to solve real-world problems across industries.",
            duration: "4 years",
            degree: "Bachelor of Science",
            credits: "120 credits",
            highlights: [
                "Comprehensive training in statistical modeling and machine learning",
                "Access to large datasets and high-performance computing resources",
                "Industry partnerships for real-world data projects",
                "Preparation for roles in data analysis, business intelligence, and AI",
                "Strong foundation for graduate studies in data science and analytics"
            ],
            curriculum: [
                { year: "1", courses: ["Introduction to Data Science", "Programming with Python", "Calculus & Linear Algebra", "Statistics I"] },
                { year: "2", courses: ["Data Management", "Statistical Inference", "Data Visualization", "Machine Learning Fundamentals"] },
                { year: "3", courses: ["Big Data Technologies", "Advanced Machine Learning", "Data Mining", "Natural Language Processing"] },
                { year: "4", courses: ["Capstone Data Project", "Deep Learning", "Business Intelligence", "Data Ethics & Privacy"] }
            ]
        },
        it: {
            id: "it",
            name: "IT Management",
            description: "The IT Management program bridges technology and business, preparing students to lead technology initiatives in organizations. Students learn about systems analysis, project management, IT governance, and business strategy while developing communication and leadership skills.",
            duration: "4 years",
            degree: "Bachelor of Science",
            credits: "120 credits",
            highlights: [
                "Combines technical knowledge with business acumen",
                "Project management certification preparation (CAPM)",
                "Case studies of real-world IT implementations",
                "Internships with corporate IT departments",
                "Preparation for leadership roles in technology organizations"
            ],
            curriculum: [
                { year: "1", courses: ["Introduction to Business", "Fundamentals of IT", "Financial Accounting", "Business Communication"] },
                { year: "2", courses: ["Systems Analysis & Design", "Database Management", "Business Statistics", "Organizational Behavior"] },
                { year: "3", courses: ["IT Project Management", "Enterprise Architecture", "Business Intelligence", "Networking & Infrastructure"] },
                { year: "4", courses: ["Capstone IT Project", "IT Governance & Strategy", "Digital Transformation", "Leadership in Technology"] }
            ]
        }
    };
    
    // DOM elements
    const programTabs = document.querySelectorAll('.program-tab');
    const programContents = document.querySelectorAll('.program-content');
    
    // Initialize first program as active
    if (programTabs.length > 0) {
        programTabs[0].classList.add('active');
        programContents[0].classList.add('active');
        displayProgramDetails(programsData.cs);
    }
    
    // Program tab switching
    programTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const programId = this.getAttribute('data-program');
            
            // Update active tab
            programTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            programContents.forEach(content => content.classList.remove('active'));
            document.getElementById(programId).classList.add('active');
            
            // Display program details
            if (programsData[programId]) {
                displayProgramDetails(programsData[programId]);
            }
        });
    });
    
    // Display program details
    function displayProgramDetails(program) {
        const programDetails = document.getElementById('programDetails');
        if (!programDetails) return;
        
        // Generate curriculum table rows
        const curriculumRows = program.curriculum.map(year => `
            <tr>
                <td>Year ${year.year}</td>
                <td>${year.courses.join(', ')}</td>
            </tr>
        `).join('');
        
        // Generate highlights list
        const highlightsList = program.highlights.map(highlight => 
            `<li>${highlight}</li>`
        ).join('');
        
        programDetails.innerHTML = `
            <div class="program-overview">
                <div class="program-description">
                    <h2>${program.name}</h2>
                    <p>${program.description}</p>
                    <div class="program-stats">
                        <p><strong>Degree:</strong> ${program.degree}</p>
                        <p><strong>Duration:</strong> ${program.duration}</p>
                        <p><strong>Credits Required:</strong> ${program.credits}</p>
                    </div>
                </div>
                <div class="program-highlights">
                    <h3>Program Highlights</h3>
                    <ul>
                        ${highlightsList}
                    </ul>
                </div>
            </div>
            <div class="curriculum">
                <h3>Sample Curriculum</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Core Courses</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${curriculumRows}
                    </tbody>
                </table>
            </div>
            <div class="program-cta" style="margin-top: 40px; text-align: center;">
                <a href="inquiry.html" class="btn btn-primary">Request Information</a>
                <a href="inquiry.html" class="btn btn-secondary" style="margin-left: 15px;">Apply Now</a>
            </div>
        `;
    }
    
    // Expandable course descriptions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('course-title')) {
            const courseDetails = e.target.nextElementSibling;
            courseDetails.classList.toggle('expanded');
            e.target.querySelector('.expand-icon').textContent = 
                courseDetails.classList.contains('expanded') ? '−' : '+';
        }
    });
    // Dynamic Breadcrumb Generation
function generateBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb ul');
    if (!breadcrumbContainer) return;
    
    const currentPage = window.location.pathname.split('/').pop();
    const pageNames = {
        'index.html': 'Home',
        'college.html': 'About College',
        'academics.html': 'Academic Programs',
        'faculty.html': 'Faculty Directory',
        'announcement.html': 'Announcements',
        'inquiry.html': 'Contact'
    };
    
    breadcrumbContainer.innerHTML = '';
    
    // Always start with home
    const homeItem = document.createElement('li');
    homeItem.innerHTML = '<a href="index.html"><i class="fas fa-home"></i> Home</a>';
    breadcrumbContainer.appendChild(homeItem);
    
    // Add current page (except home)
    if (currentPage !== 'index.html' && pageNames[currentPage]) {
        const currentItem = document.createElement('li');
        currentItem.textContent = pageNames[currentPage];
        breadcrumbContainer.appendChild(currentItem);
    }
}
});