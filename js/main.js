document.addEventListener('DOMContentLoaded', () => {
    const lessonGrid = document.getElementById('lessonGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 1. Load the lessons from your Master List
    // We use './lessons.json' to ensure it looks in the root folder
    fetch('./lessons.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not find lessons.json file");
            }
            return response.json();
        })
        .then(lessons => {
            console.log("Lessons loaded successfully:", lessons);
            displayLessons(lessons);
            setupFilters(lessons);
        })
        .catch(error => {
            console.error("Error loading lessons:", error);
            // This puts a message on your website if something goes wrong
            if(lessonGrid) {
                lessonGrid.innerHTML = `
                    <div style="text-align:center; padding: 50px; color: #666;">
                        <p>Unable to load lessons at the moment.</p>
                        <small>Error: ${error.message}</small>
                    </div>`;
            }
        });

    function displayLessons(lessonsToShow) {
        if (!lessonGrid) return;
        
        lessonGrid.innerHTML = ''; 
        lessonsToShow.forEach(lesson => {
            const card = document.createElement('article');
            card.className = 'lesson-card';
            // Important: We add a fade-in animation style here
            card.style.animation = 'fadeIn 0.5s ease forwards';
            
            card.innerHTML = `
                <div class="card-image" style="background-image: url('${lesson.image}');"></div>
                <div class="card-content">
                    <span class="category">${lesson.category}</span>
                    <h2>${lesson.title}</h2>
                    <p>${lesson.preview}</p>
                    <a href="lesson-template.html?id=${lesson.id}" class="read-more">Read Lesson →</a>
                </div>
            `;
            lessonGrid.appendChild(card);
        });
    }

    function setupFilters(allLessons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // UI update: toggle active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter logic
                const category = button.textContent.toLowerCase();
                const filtered = category === 'all' 
                    ? allLessons 
                    : allLessons.filter(l => l.category === category);
                
                displayLessons(filtered);
            });
        });
    }
});
