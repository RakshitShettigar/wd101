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
    const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve array of users from localStorage
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; // Clear the existing content

    // Insert a row for each saved user
    users.forEach(user => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.dob}</td>
                <td>${user.termsAccepted ? 'Yes' : 'No'}</td>
            </tr>
        `;
        tableBody.innerHTML += row; // Append the row to the table body
    });
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

    // Retrieve existing users or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the array
    const user = { name, email, password, dob, termsAccepted };
    users.push(user);

    // Save the updated array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Load the updated user data into the table
    loadUserData();

    // Optionally, reset the form
    form.reset();
});

// Load data into the table when the page is loaded
document.addEventListener('DOMContentLoaded', loadUserData);
