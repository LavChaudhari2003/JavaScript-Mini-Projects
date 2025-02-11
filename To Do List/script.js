// Get references to input box and list container from the DOM
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task to the list
function addTask() {
    // Check if the input box is empty or only contains spaces
    if(inputBox.value.trim() === '') {
        alert("You must enter something"); // Alert if input is empty
    } else {
        // Create a new <li> element for the task
        let li = document.createElement("li");
        
        // Set the task content to the input value (after trimming spaces)
        li.innerHTML = inputBox.value.trim();
        
        // Add the new task <li> to the list container
        listContainer.appendChild(li);

        // Create a new <span> for the delete icon (×)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // Unicode character for the '×' symbol
        
        // Append the delete icon <span> to the <li> (task)
        li.appendChild(span);
    }
    
    // Clear the input box after adding the task
    inputBox.value = '';
    
    // Save the current state of the list to local storage
    saveData();
}

// Event listener for clicking on tasks or delete icons
listContainer.addEventListener("click", function(e) {
    // If a task (li) is clicked, toggle the 'checked' class (mark it as completed)
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData(); // Save the updated list state
    }
    // If the delete icon (span) is clicked, remove the task (li) from the list
    else if(e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();  // Remove the <li> containing the clicked <span>
        saveData(); // Save the updated list state
    }
}, false);

// Function to save the current list of tasks to local storage
function saveData() {
    // Store the current inner HTML of the list container (task list) in localStorage
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show (load) tasks from local storage when the page is reloaded
function showTask() {
    // Get the saved task data from local storage and set it as the inner HTML of the list container
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call showTask() on page load to load the previously saved tasks
showTask();
