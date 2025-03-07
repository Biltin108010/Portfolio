let allCourses = []; // Store courses globally

document.addEventListener("DOMContentLoaded", function () {
    fetch("courses.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            allCourses = data.courses;
            displayCourses(allCourses);
        })
        .catch(error => {
            console.error("Error fetching JSON:", error);
            document.getElementById("courses").innerHTML = "<p>Failed to load courses.</p>";
        });

const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredCourses = allCourses.map(course => {
            const filteredSubjects = course.subjects.filter(subject =>
                subject.toLowerCase().includes(searchTerm)
            );
            return { ...course, subjects: filteredSubjects };
        }).filter(course => course.subjects.length > 0);

        displayCourses(filteredCourses);
    });
});

function displayCourses(courses) {
    const coursesContainer = document.getElementById("course-list");
    coursesContainer.innerHTML = "";

    if (courses.length === 0) {
        coursesContainer.innerHTML = "<p>No subjects found.</p>";
        return;
    }

    let content = "";

    courses.forEach(course => {
        content += `
            <h3>${course.year} - ${course.semester}</h3>
            <ul>
                ${course.subjects.map(subject => `<li>${subject}</li>`).join("")}
            </ul>
        `;
    });

    coursesContainer.innerHTML = content;
}
