const apiUrl = "https://jsonplaceholder.typicode.com/users";
const userTable = document.getElementById("userTable");
const userForm = document.getElementById("userForm");
let usersList = [];
let maxUserId = 0; // Tracks the highest user ID for sequential assignment

document.addEventListener("DOMContentLoaded", fetchUsers);

// Fetch users from the API
async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        const users = await response.json();
        
        usersList = users; // Keep users in a local array for better editing
        maxUserId = users.reduce((max, user) => Math.max(max, user.id), 0);
        displayUsers(usersList);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Display users in the table
function displayUsers(users) {
    userTable.innerHTML = "";
    users.forEach(user => addUserToTable(user));
}

// Add a user row to the table
function addUserToTable(user) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name.split(" ")[0]}</td>
        <td>${user.name.split(" ")[1] || ""}</td>
        <td>${user.email}</td>
        <td>${user.company?.name || ""}</td>
        <td>
            <button onclick="editUser(${user.id})">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
    `;
    userTable.appendChild(row);
}

// Handle form submission for adding or editing users
userForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.getElementById("userId").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    const userData = {
        id: id ? parseInt(id) : ++maxUserId,
        name: `${firstName} ${lastName}`,
        email,
        company: { name: department },
    };

    if (id) {
        await updateUser(id, userData);
    } else {
        await addUser(userData);
    }

    userForm.reset();
});

// Add a new user
async function addUser(userData) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const newUser = await response.json();
        
        usersList.push({ ...userData }); // Use manually assigned ID
        displayUsers(usersList); // Refresh the user table
    } catch (error) {
        console.error("Error adding user:", error);
    }
}

// Edit user (pre-fill form)
function editUser(id) {
    const user = usersList.find(user => user.id === id);
    if (!user) return;

    document.getElementById("userId").value = user.id;
    document.getElementById("firstName").value = user.name.split(" ")[0];
    document.getElementById("lastName").value = user.name.split(" ")[1] || "";
    document.getElementById("email").value = user.email;
    document.getElementById("department").value = user.company?.name || "";
}

// Update user
async function updateUser(id, userData) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        // Update user in local array
        const userIndex = usersList.findIndex(user => user.id === parseInt(id));
        if (userIndex !== -1) {
            usersList[userIndex] = userData;
        }
        displayUsers(usersList);
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

// Delete a user
async function deleteUser(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        usersList = usersList.filter(user => user.id !== id);
        displayUsers(usersList);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}
