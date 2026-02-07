// Announcements JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Announcements data
    const announcementsData = [
        {
            id: 1,
            title: "Fall 2023 Registration Now Open",
            date: "2023-08-15",
            category: "Academic",
            excerpt: "Registration for the Fall 2023 semester is now open for all returning students. New students will receive registration information via email.",
            fullText: "Registration for the Fall 2023 semester is now open for all returning students. Please log into the student portal to select your courses. New students will receive registration information via email. The last day to add/drop courses without penalty is September 5th. For any registration issues, please contact the registrar's office."
        },
        {
            id: 2,
            title: "Annual Tech Symposium 2023",
            date: "2023-09-20",
            category: "Event",
            excerpt: "Join us for our annual technology symposium featuring industry leaders and alumni panels.",
            fullText: "The College of Computer Studies is proud to host the Annual Tech Symposium on September 20th, 2023. This year's theme is 'The Future of AI in Society'. We will have keynote speakers from leading tech companies, panel discussions with alumni, and student project showcases. Registration is free for all students and faculty."
        },
        {
            id: 3,
            title: "Cybersecurity Workshop Series",
            date: "2023-08-25",
            category: "Workshop",
            excerpt: "Hands-on workshops covering ethical hacking, network defense, and digital forensics.",
            fullText: "The Cybersecurity Department is hosting a series of hands-on workshops throughout the semester. Topics include ethical hacking fundamentals, network defense strategies, digital forensics techniques, and secure coding practices. These workshops are open to all students regardless of major. No prior experience is required for the beginner sessions."
        },
        {
            id: 4,
            title: "Scholarship Application Deadline",
            date: "2023-09-10",
            category: "Financial",
            excerpt: "Applications for merit-based scholarships for the 2024 academic year are due September 10th.",
            fullText: "The deadline for merit-based scholarship applications for the 2024 academic year is September 10th, 2023. Several new scholarships have been added this year, including the Women in Tech Scholarship and the Diversity in Computing Award. Applications can be submitted through the financial aid portal. Letters of recommendation must be submitted separately by the recommenders."
        },
        {
            id: 5,
            title: "Data Science Competition",
            date: "2023-10-05",
            category: "Competition",
            excerpt: "Test your data analysis skills in our annual data science competition with cash prizes.",
            fullText: "The annual Data Science Competition will be held on October 5th, 2023. Participants will work with real-world datasets to solve challenging problems. Cash prizes will be awarded to the top three teams ($3000, $2000, and $1000). This is a team competition (2-4 members per team). Registration closes on September 25th."
        },
        {
            id: 6,
            title: "Career Fair: Tech Companies",
            date: "2023-10-18",
            category: "Career",
            excerpt: "Over 50 tech companies will be on campus recruiting for internships and full-time positions.",
            fullText: "The Fall Career Fair will take place on October 18th, 2023 in the University Center. Over 50 tech companies including Google, Microsoft, Amazon, and many startups will be recruiting for internships and full-time positions. Students are encouraged to bring multiple copies of their resume and dress professionally. Resume review sessions are available the week before the fair."
        }
    ];
    
    // DOM elements
    const announcementsContainer = document.getElementById('announcementsContainer');
    const homeEventsContainer = document.getElementById('homeEvents');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const viewToggleButtons = document.querySelectorAll('.view-toggle button');
    
    // Initialize announcements
    displayAnnouncements(announcementsData);
    displayHomeEvents(announcementsData.slice(0, 3));
    
    // Filter by category
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            let filteredAnnouncements;
            
            if (category === 'all') {
                filteredAnnouncements = announcementsData;
            } else {
                filteredAnnouncements = announcementsData.filter(announcement => 
                    announcement.category.toLowerCase() === category.toLowerCase()
                );
            }
            
            displayAnnouncements(filteredAnnouncements);
        });
    });
    
    // Toggle between grid and list view
    viewToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            viewToggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const viewType = this.getAttribute('data-view');
            announcementsContainer.setAttribute('data-view', viewType);
        });
    });
    
    // Display announcements in grid or list view
    function displayAnnouncements(announcementsArray) {
        announcementsContainer.innerHTML = '';
        
        if (announcementsArray.length === 0) {
            announcementsContainer.innerHTML = `
                <div class="no-results" style="text-align: center; padding: 40px; grid-column: 1 / -1;">
                    <h3>No announcements found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            return;
        }
        
        // Get current view type
        const viewType = announcementsContainer.getAttribute('data-view') || 'grid';
        
        announcementsArray.forEach(announcement => {
            if (viewType === 'grid') {
                displayAnnouncementGrid(announcement);
            } else {
                displayAnnouncementList(announcement);
            }
        });
    }
    
    // Display announcement in grid view
    function displayAnnouncementGrid(announcement) {
        const announcementCard = document.createElement('div');
        announcementCard.className = 'announcement-card';
        
        // Format date
        const date = new Date(announcement.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        announcementCard.innerHTML = `
            <div style="padding: 30px;">
                <span class="announcement-badge">${announcement.category}</span>
                <span class="announcement-date">${formattedDate}</span>
                <h3>${announcement.title}</h3>
                <p>${announcement.excerpt}</p>
                <button class="btn btn-outline read-more-btn" data-id="${announcement.id}">Read More</button>
            </div>
        `;
        
        announcementsContainer.appendChild(announcementCard);
    }
    
    // Display announcement in list view
    function displayAnnouncementList(announcement) {
        const announcementItem = document.createElement('div');
        announcementItem.className = 'announcement-item';
        
        // Format date for list view
        const date = new Date(announcement.date);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        
        announcementItem.innerHTML = `
            <div class="announcement-date">
                <span class="day">${day}</span>
                <span class="month">${month}</span>
            </div>
            <div class="announcement-content">
                <span class="announcement-badge">${announcement.category}</span>
                <h3>${announcement.title}</h3>
                <p>${announcement.excerpt}</p>
                <button class="btn btn-outline read-more-btn" data-id="${announcement.id}">Read More</button>
            </div>
        `;
        
        announcementsContainer.appendChild(announcementItem);
    }
    
    // Display events on home page
    function displayHomeEvents(eventsArray) {
        if (!homeEventsContainer) return;
        
        homeEventsContainer.innerHTML = '';
        
        eventsArray.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            // Format date
            const date = new Date(event.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            eventCard.innerHTML = `
                <div class="event-date">${formattedDate}</div>
                <h3>${event.title}</h3>
                <p>${event.excerpt}</p>
                <a href="announcement.html" class="event-link">View Details <i class="fas fa-arrow-right"></i></a>
            `;
            
            homeEventsContainer.appendChild(eventCard);
        });
    }
    
    // Event delegation for "Read More" buttons
    announcementsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('read-more-btn')) {
            const announcementId = parseInt(e.target.getAttribute('data-id'));
            const announcement = announcementsData.find(a => a.id === announcementId);
            
            if (announcement) {
                // Show announcement details in a modal (simplified for this example)
                alert(`Full Announcement: ${announcement.title}\n\n${announcement.fullText}`);
            }
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