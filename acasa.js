document.addEventListener("DOMContentLoaded", function () {
    // Verifică dacă utilizatorul este logat în localStorage
    if (localStorage.getItem("loggedIn") === "true") {
        // Ascunde formularul de login
        document.getElementById("loginForm").style.display = "none";
        
        // Afișează butonul de logout
        document.getElementById("logoutButton").style.display = "inline-block"; 
    }
});

// Evenimentul de login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Fetch user data from the users.json file
    fetch('users.json')
        .then(response => response.json()) // Parse JSON from the response
        .then(data => {
            const users = data.users; // Access the 'users' array in the JSON data
            const user = users.find(u => u.username === username && u.password === password); // Find matching user

            if (user) {
                document.getElementById("loginMessage").textContent = "Login successful!";
                localStorage.setItem("loggedIn", "true"); // Save logged-in status in localStorage

                // Ascunde formularul de login
                document.getElementById("loginForm").style.display = "none";
                
                // Afișează butonul de logout
                document.getElementById("logoutButton").style.display = "inline-block"; 
            } else {
                document.getElementById("loginMessage").textContent = "Invalid username or password.";
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById("loginMessage").textContent = "An error occurred. Please try again.";
        });
});

// Butonul de logout
document.getElementById("logoutButton").addEventListener("click", function () {
    // Îndepărtează statutul de login din localStorage
    localStorage.removeItem("loggedIn");

    // Afișează din nou formularul de login
    document.getElementById("loginForm").style.display = "block";

    // Ascunde butonul de logout
    document.getElementById("logoutButton").style.display = "none";
});
