// Just grabbing DOM elements we're going to work with
const fetchBtn = document.getElementById('fetchDataBtn');
const usersDisplay = document.getElementById('data-container');
const spinner = document.getElementById('loading-indicator');
const errorBox = document.getElementById('error-message');
const errorMsgText = document.getElementById('error-text');

// Using a public dummy API for testing purposes
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

// Hook up click event to trigger the API call
fetchBtn.addEventListener('click', loadUserData);

// This function fetches users from the API and handles display/errors
async function loadUserData() {
    // Clear the stage
    toggleSpinner(true);
    resetDisplay();
    dismissError();

    try {
        const res = await fetch(USERS_API);

        // If something went wrong (e.g. 404, 500, etc.)
        if (!res.ok) {
            throw new Error(`API responded with status ${res.status}`);
        }

        const userList = await res.json();
        renderUsers(userList);

    } catch (err) {
        console.warn('Something blew up:', err); // dev-style log
        showErrorBox(`Oops. Couldn't load user data. Reason: ${err.message}`);
    } finally {
        toggleSpinner(false); // Always hide spinner
    }
}

// Show user data or a message if it's empty
function renderUsers(users) {
    if (!Array.isArray(users) || users.length === 0) {
        usersDisplay.innerHTML = `<p class="text-gray-500 col-span-full text-center">Hmm... no users to show.</p>`;
        return;
    }

    // For each user, we'll create a quick summary card
    users.forEach((person) => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out';

        // This could be templated better but eh, works for now
        card.innerHTML = `
            <h2 class="text-xl font-semibold text-gray-800 mb-2">${person.name}</h2>
            <p class="text-gray-600 mb-1">
                <a href="mailto:${person.email}" class="hover:text-blue-600">${person.email}</a>
            </p>
            <p class="text-gray-500 text-sm">${person.company.name}</p>
        `;

        usersDisplay.appendChild(card);
    });
}

// Just empties the results div
function resetDisplay() {
    // Could just do .textContent = '', but keeping innerHTML in case we add HTML
    usersDisplay.innerHTML = '';
}

// Shows/hides the spinner based on flag
function toggleSpinner(showIt) {
    if (spinner) {
        spinner.style.display = showIt ? 'flex' : 'none';
    }
}

// Show an error message box with provided message
function showErrorBox(msg) {
    if (errorMsgText && errorBox) {
        errorMsgText.textContent = msg;
        errorBox.style.display = 'block';
    }
}

// Hides the error message (if it's there)
function dismissError() {
    if (errorBox) {
        errorBox.style.display = 'none';
    }
}
