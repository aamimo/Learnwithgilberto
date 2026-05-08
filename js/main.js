document.addEventListener('DOMContentLoaded', () => {
    const lessonGrid = document.getElementById('lessonGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Load the lessons from your Master List
    fetch('./lessons.json')
        .then(response => response.json())
        .then(lessons => {
            displayLessons(lessons);
            setupFilters(lessons);
        });

    function displayLessons(lessonsToShow) {
        lessonGrid.innerHTML = ''; 
        lessonsToShow.forEach(lesson => {
            const card = document.createElement('article');
            card.className = 'lesson-card';
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
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.textContent.toLowerCase();
                const filtered = category === 'all' 
                    ? allLessons 
                    : allLessons.filter(l => l.category === category);
                displayLessons(filtered);
            });
        });
    }
});
