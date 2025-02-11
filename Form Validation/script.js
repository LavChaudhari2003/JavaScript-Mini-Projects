// Selecting error message elements for each field
var nameErr = document.getElementById("name-err");
var phoneErr = document.getElementById("tel-err");
var emailErr = document.getElementById("email-err");
var msgErr = document.getElementById("msg-err");
var submitErr = document.getElementById("submit-err");
var passwordErr = document.getElementById("password-err");

// Function to validate the name input (first and last name)
function validateName() {
    nameErr.style.color = "red";  // Set error color initially
    var name = document.getElementById("contact-name").value;

    // Check if the name field is empty
    if (name.length == 0) {
        nameErr.innerHTML = "Name is required";  // Display error message
        return false;  // Return false to indicate invalid input
    }

    // Check if the name contains both first name and last name
    if (!name.match(/^[A-Za-z]+(\s[A-Za-z]+)+$/)) {
        nameErr.innerHTML = "Please enter both first name and last name";  // Display error message
        return false;  // Return false to indicate invalid input
    }

    nameErr.innerHTML = "valid";  // If valid, display "valid" message
    nameErr.style.color = "green";  // Change color to green for valid input
    return true;  // Return true to indicate valid input
}

// Function to validate the phone number input (10-digit number)
function validatePhone() {
    phoneErr.style.color = "red";  // Set error color initially
    var phone = document.getElementById("contact-phone").value;
    var phoneRegex = /^[0-9]{10}$/;  // Regex to check for a 10-digit phone number

    // Check if the phone number is not a valid 10-digit number
    if (!phoneRegex.test(phone)) {
        phoneErr.innerHTML = "Please enter a valid 10-digit phone number.";  // Display error message
        return false;  // Return false to indicate invalid input
    } else {
        phoneErr.innerHTML = "valid";  // If valid, display "valid" message
        phoneErr.style.color = "green";  // Change color to green for valid input
        return true;  // Return true to indicate valid input
    }
}

// Function to validate the email input
function validateEmail() {
    emailErr.style.color = "red";  // Set error color initially
    var email  = document.getElementById("contact-email").value;
    
    // Regex to check for a valid email format
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email is not valid
    if (!emailRegex.test(email)) {
        emailErr.innerHTML = "Please enter a valid email.";  // Display error message
        return false;  // Return false to indicate invalid input
    } else {
        emailErr.innerHTML = "valid";  // If valid, display "valid" message
        emailErr.style.color = "green";  // Change color to green for valid input
        return true;  // Return true to indicate valid input
    }
}

// Function to validate the password input
function validatePassword() {
    passwordErr.style.color = "red";  // Set error color initially
    var password  = document.getElementById("contact-password").value;
    
    // Regex to check if the password has at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character, and 8 characters
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Check if the password does not meet the requirements
    if (!passwordRegex.test(password)) {
        passwordErr.innerHTML = "Please enter a valid password.";  // Display error message
        return false;  // Return false to indicate invalid input
    } else {
        passwordErr.innerHTML = "valid";  // If valid, display "valid" message
        passwordErr.style.color = "green";  // Change color to green for valid input
        return true;  // Return true to indicate valid input
    }
}

// Function to validate the message input (should be at least 30 characters)
function validateMsg() {
    msgErr.style.color = "red";  // Set error color initially
    var msg = document.getElementById("contact-msg").value;

    // Check if the message has fewer than 30 characters
    if (msg.length < 30) {
        msgErr.innerHTML = "Message should be at least 30 characters";  // Display error message
        return false;  // Return false to indicate invalid input
    } else {
        msgErr.innerHTML = "valid";  // If valid, display "valid" message
        msgErr.style.color = "green";  // Change color to green for valid input
        return true;  // Return true to indicate valid input
    }
}

// Function to validate the entire form before submission
function validateForm() {

    // If any field is invalid, show a general error message and prevent form submission
    if (!(validateName() && validatePhone() && validateEmail() && validatePassword() && validateMsg())) {
        submitErr.style.display = 'block';  // Show submit error message
        submitErr.innerHTML = "Please fix errors to submit";  // Display the error message
        setTimeout(function() { submitErr.style.display = "none"; }, 3000);  // Hide the error message after 3 seconds
        return false;  // Return false to prevent form submission
    }
}
