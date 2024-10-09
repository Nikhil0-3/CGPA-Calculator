function gradePoints(grade) {
    switch (grade) {
        case 'S': return 10;
        case 'A': return 9;
        case 'B': return 8;
        case 'C': return 7;
        case 'D': return 6;
        case 'E': return 5;
        case 'F': return 0;
        case 'P': return -1;
        case 'N': return -1;
        default: return 0;
    }
}

function calculateGPA() {
    let totalCredits = 0;
    let totalCreditPoints = 0;

    const credits = document.querySelectorAll('.credit');
    const grades = document.querySelectorAll('.grade');

    for (let i = 0; i < credits.length; i++) {
        let credit = parseFloat(credits[i].value);
        let grade = grades[i].value;
        let points = gradePoints(grade);

        if (!isNaN(credit) && points >= 0) {
            totalCredits += credit;
            totalCreditPoints += credit * points;
        }
    }

    if (totalCredits > 0) {
        let gpa = (totalCreditPoints / totalCredits).toFixed(2);
        document.getElementById('gpaResult').textContent = `Semester GPA: ${gpa}`;
    } else {
        alert('Please enter valid values for credits and grades.');
    }
}

function addSubjectField() {
    const subjectFields = document.getElementById('subjectFields');

    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject-container');

    const creditInput = document.createElement('input');
    creditInput.type = 'number';
    creditInput.name = 'credit';
    creditInput.placeholder = 'Credit';
    creditInput.classList.add('credit');
    creditInput.min = 1;
    creditInput.required = true;

    const gradeSelect = document.createElement('select');
    gradeSelect.name = 'grade';
    gradeSelect.classList.add('grade');
    gradeSelect.required = true;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';  // Blank value for the default
    defaultOption.textContent = 'Select';  // Display text 'Select'
    defaultOption.selected = true;  // Set as the default selected option
    gradeSelect.appendChild(defaultOption);

    const grades = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'P', 'N'];
    grades.forEach((grade) => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
    });

    // Append the inputs to the subject div
    subjectDiv.appendChild(creditInput);
    subjectDiv.appendChild(gradeSelect);

    // Add an "X" button to remove the subject
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';  // Set the text to "X"
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function () {
        subjectFields.removeChild(subjectDiv);
    };

    subjectDiv.appendChild(deleteButton);
    subjectFields.appendChild(subjectDiv);
}

function initializeFields() {
    for (let i = 0; i < 5; i++) {
        addSubjectField();  // Add 5 input fields on page load for Semester GPA
    }
    
    // Load 2 GPA and Credits fields for Overall CGPA Calculation
    for (let i = 0; i < 2; i++) {
        addSemesterField();  // Add 2 input fields on page load for Overall CGPA
    }
}

// Function to add GPA and credit inputs in a horizontal layout with delete button for Overall CGPA calculation
function addSemesterField() {
    const semesterFields = document.getElementById('semesterFields');

    const semesterDiv = document.createElement('div');  // Container for semester inputs
    semesterDiv.classList.add('subject-container');

    const gpaInput = document.createElement('input');
    gpaInput.type = 'number';
    gpaInput.step = '0.01';
    gpaInput.classList.add('gpa-input');
    gpaInput.placeholder = 'Semester GPA';

    const creditInput = document.createElement('input');
    creditInput.type = 'number';
    creditInput.classList.add('credit-input');
    creditInput.placeholder = 'Credits';

    // Add the GPA and credit inputs to the semesterDiv
    semesterDiv.appendChild(gpaInput);
    semesterDiv.appendChild(creditInput);

    // Add a delete button for the semester
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function () {
        semesterFields.removeChild(semesterDiv);
    };

    semesterDiv.appendChild(deleteButton);
    semesterFields.appendChild(semesterDiv);
}

function calculateOverallCGPAFromInput() {
    let totalCredits = 0;
    let totalGradePoints = 0;

    const gpaInputs = document.querySelectorAll('.gpa-input');
    const creditInputs = document.querySelectorAll('.credit-input');

    for (let i = 0; i < gpaInputs.length; i++) {
        const gpa = parseFloat(gpaInputs[i].value);
        const credits = parseFloat(creditInputs[i].value);

        if (!isNaN(gpa) && !isNaN(credits)) {
            totalGradePoints += gpa * credits;
            totalCredits += credits;
        }
    }

    if (totalCredits > 0) {
        const cgpa = (totalGradePoints / totalCredits).toFixed(2);
        document.getElementById('manualCgpaResult').textContent = `Overall CGPA: ${cgpa}`;
    } else {
        alert('Please enter valid GPA and credit values for all semesters.');
    }
}

function submitFeedback() {
    const feedback = document.getElementById('feedbackInput').value;
    if (feedback.trim()) {
        const feedbackList = document.getElementById('feedbackList');

        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.textContent = feedback;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function () {
            feedbackList.removeChild(feedbackItem);
        };

        feedbackItem.appendChild(deleteButton);
        feedbackList.appendChild(feedbackItem);
        document.getElementById('feedbackInput').value = '';  // Clear input after submission
    } else {
        alert('Please enter some feedback.');
    }
}

// Initialize the form with 5 subject fields and 2 GPA/credit fields on page load
initializeFields();
