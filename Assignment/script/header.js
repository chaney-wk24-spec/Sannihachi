  // Check if user is logged in
  const loggedInUser = sessionStorage.getItem("user");

  const loginNav = document.getElementById("login-nav");
  const signupNav = document.getElementById("signup-nav");
  const logoutNav = document.getElementById("logout-nav");

  if (loggedInUser) {
    // User is logged in: show logout, hide login/signup
    loginNav.style.display = "none";
    signupNav.style.display = "none";
    logoutNav.style.display = "block";
  }

  // Logout action
  logoutNav.addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
    window.location.reload(); // Reload page to reset state
    
  });

  // Store login/signup choice in sessionStorage
  function setSession(option) {
    sessionStorage.setItem("authOption", option); // "login" or "signup"
  }

  // Later in your login.html or other scripts, you can read this:
  const authOption = sessionStorage.getItem("authOption");
  if (authOption === "login") {
    console.log("User chose to log in");
    // Customize the page to show login form
  } else if (authOption === "signup") {
    console.log("User chose to sign up");
    // Customize the page to show sign-up form
  }
