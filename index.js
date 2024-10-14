// Validate if age is between 18 and 55 based on the date of birth
function validateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--; // Adjust age if the birthday hasn't occurred yet this year
    }

    return age >= 18 && age <= 55;
}

// Load data from localStorage and populate the table
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return; // If no user is found, exit the function

    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; // Clear the existing content

    // Insert a row with the saved user data
    const row = `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.termsAccepted}</td>
        </tr>
    `;

    tableBody.innerHTML += row; // Append the row to the table body
}

// Handle form submission
const form = document.getElementById('registrationForm');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validate age
    if (!validateAge(dob)) {
        alert('Age must be between 18 and 55');
        return;
    }

    // Save the form data to localStorage
    const user = { name, email, password, dob, termsAccepted };
    localStorage.setItem('user', JSON.stringify(user));

    // Load the user data into the table
    loadUserData();
});

// Load data into the table when the page is loaded
document.addEventListener('DOMContentLoaded', loadUserData);
