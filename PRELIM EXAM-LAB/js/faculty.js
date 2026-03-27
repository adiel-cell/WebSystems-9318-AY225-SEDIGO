// Faculty Directory JavaScript with Profile Pictures

document.addEventListener('DOMContentLoaded', function() {
    // Faculty data with profile pictures
    const facultyData = [
        {
            id: 1,
            name: "Sir Val",
            title: "Professor & The greatest Computer science and Information tech teacher to have ever exists!",
            department: "Computer Science",
            expertise: ["Artificial Intelligence", "Machine Learning", "Data Mining"],
            email: "s.val@ccs.edu",
            phone: "(123) 456-7890 ext. 101",
            office: "CS Building, Room 301",
            image: "Sir Val.PNG"
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            title: "Associate Professor",
            department: "Cybersecurity",
            expertise: ["Network Security", "Cryptography", "Ethical Hacking"],
            email: "m.chen@ccs.edu",
            phone: "(123) 456-7890 ext. 102",
            office: "CS Building, Room 205",
            image: "Dr. Micheal Chen.jpg"
        },
        {
            id: 3,
            name: "Dr. Emily Rodriguez",
            title: "Assistant Professor",
            department: "Data Science",
            expertise: ["Statistical Modeling", "Big Data Analytics", "Python Programming"],
            email: "e.rodriguez@ccs.edu",
            phone: "(123) 456-7890 ext. 103",
            office: "DS Building, Room 110",
            image: "emily.jpg"
        },
        {
            id: 4,
            name: "Prof. James Wilson",
            title: "Senior Lecturer",
            department: "Software Engineering",
            expertise: ["Web Development", "Mobile Apps", "Agile Methodologies"],
            email: "j.wilson@ccs.edu",
            phone: "(123) 456-7890 ext. 104",
            office: "CS Building, Room 150",
            image: "Prof james willson.jpg"
        },
        {
            id: 5,
            name: "Dr. Lisa Park",
            title: "Associate Professor",
            department: "Computer Science",
            expertise: ["Human-Computer Interaction", "UX Design", "Accessibility"],
            email: "l.park@ccs.edu",
            phone: "(123) 456-7890 ext. 105",
            office: "CS Building, Room 310",
            image: "Lisa.jpg"
        },
        {
            id: 6,
            name: "Dr. Robert Miller",
            title: "Professor",
            department: "Cybersecurity",
            expertise: ["Digital Forensics", "Incident Response", "Risk Management"],
            email: "r.miller@ccs.edu",
            phone: "(123) 456-7890 ext. 106",
            office: "CS Building, Room 210",
            image: "robert miller.jpg"
        },
        {
            id: 7,
            name: "Dr. Amanda Davis",
            title: "Assistant Professor",
            department: "Data Science",
            expertise: ["Natural Language Processing", "Deep Learning", "Data Visualization"],
            email: "a.davis@ccs.edu",
            phone: "(123) 456-7890 ext. 107",
            office: "DS Building, Room 115",
            image: "amanda.jpg"
        },
        {
            id: 8,
            name: "Prof. David Thompson",
            title: "Lecturer",
            department: "IT Management",
            expertise: ["Project Management", "IT Governance", "Business Analysis"],
            email: "d.thompson@ccs.edu",
            phone: "(123) 456-7890 ext. 108",
            office: "Business Building, Room 320",
            image: "David thompson.jpg"
        }
    ];
    
    // DOM elements
    const facultyGrid = document.getElementById('facultyGrid');
    const searchInput = document.getElementById('searchInput');
    const departmentFilter = document.getElementById('departmentFilter');
    const positionFilter = document.getElementById('positionFilter');
    const searchButton = document.getElementById('searchButton');
    
    // Initialize faculty display
    displayFaculty(facultyData);
    
    // Search functionality
    if (searchButton) {
        searchButton.addEventListener('click', filterFaculty);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', filterFaculty);
    }
    
    // Department filter
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterFaculty);
    }
    
    // Position filter
    if (positionFilter) {
        positionFilter.addEventListener('change', filterFaculty);
    }
    
    // Filter faculty based on search, department, and position
    function filterFaculty() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedDepartment = departmentFilter ? departmentFilter.value : 'all';
        const selectedPosition = positionFilter ? positionFilter.value : 'all';
        
        const filteredFaculty = facultyData.filter(faculty => {
            // Search term matching
            const matchesSearch = 
                searchTerm === '' ||
                faculty.name.toLowerCase().includes(searchTerm) ||
                faculty.title.toLowerCase().includes(searchTerm) ||
                faculty.expertise.some(skill => skill.toLowerCase().includes(searchTerm));
            
            // Department matching
            const matchesDepartment = 
                selectedDepartment === 'all' || faculty.department === selectedDepartment;
            
            // Position matching
            const matchesPosition = 
                selectedPosition === 'all' || 
                faculty.title.toLowerCase().includes(selectedPosition.toLowerCase());
            
            return matchesSearch && matchesDepartment && matchesPosition;
        });
        
        displayFaculty(filteredFaculty);
    }
    
    // Display faculty members with images
    function displayFaculty(facultyArray) {
        if (!facultyGrid) return;
        
        facultyGrid.innerHTML = '';
        
        if (facultyArray.length === 0) {
            facultyGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--light-gray); border-radius: var(--border-radius);">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-color); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">No faculty members found</h3>
                    <p style="color: var(--gray-color);">Try adjusting your search criteria</p>
                </div>
            `;
            return;
        }
        
        facultyArray.forEach(faculty => {
            const facultyCard = document.createElement('div');
            facultyCard.className = 'faculty-card';
            
            // Generate expertise tags HTML
            const expertiseTags = faculty.expertise.map(skill => 
                `<span class="expertise-tag">${skill}</span>`
            ).join('');
            
            // Create image HTML - using placeholder if image not found
            const imageHtml = `
                <div class="faculty-img">
                    <img src="assets/images/faculty/${faculty.image}" 
                         alt="${faculty.name}" 
                         onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=1a365d&color=fff&size=250';"
                         loading="lazy">
                    <div class="faculty-badge">${faculty.department}</div>
                </div>
            `;
            
            facultyCard.innerHTML = `
                ${imageHtml}
                <div class="faculty-info">
                    <h3>${faculty.name}</h3>
                    <span class="faculty-title">${faculty.title}</span>
                    <div class="faculty-expertise">
                        ${expertiseTags}
                    </div>
                    <div class="faculty-contact">
                        <p class="contact-info">
                            <i class="fas fa-envelope"></i> ${faculty.email}
                        </p>
                        <p class="contact-info">
                            <i class="fas fa-phone"></i> ${faculty.phone}
                        </p>
                        <p class="contact-info">
                            <i class="fas fa-map-marker-alt"></i> ${faculty.office}
                        </p>
                    </div>
                </div>
            `;
            
            facultyGrid.appendChild(facultyCard);
        });
    }
});
