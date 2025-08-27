let inputs = document.querySelectorAll('form#signupform input');
let signupbtn = document.querySelector('#signup');
let loginbtn = document.querySelector('#login');
let result = document.querySelector("#result");
signupbtn.addEventListener('click', handleSignup);

function handleSignup(e) {
    e.preventDefault();

    let userData = {};
    inputs.forEach(ele => userData[ele.name] = ele.value.trim());

    if (!/^[a-zA-Z]{3,7}$/.test(userData.userid)) {
        return alert("❌ Username must be 3–7 letters only.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        return alert("❌ Please enter a valid email address.");
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userData.password)) {
        return alert("❌ Password must be 8+ chars with uppercase, lowercase, number, and special character.");
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let isUserExist = users.some(u => u.email === userData.email);

    if (isUserExist) {
        return alert("⚠️ A user with this email already exists.");
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert("🎉 Signup complete! Welcome aboard.");
    inputs.forEach(ele => ele.value = "");
}
//========================================================
loginbtn.addEventListener('click', handlelogin);



function handlelogin(e) {
    e.preventDefault();

    const form = document.querySelector('#signupform');
    const email = form.querySelector('input[name="email"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (!user) {
        return alert("❌ No account found with this email");
    }
    if (user.password !== password) {
        return alert("❌ Wrong password");
    }

   // ✅ Save logged-in user in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // ✅ Show user details
    result.innerHTML = ""; // clear old content

    let h1 = document.createElement('h1');
    h1.textContent = `Welcome ${user.userid}`;

    let p = document.createElement('p');
    p.textContent = `Email: ${user.email}`;

    

    // ✅ Create Logout button
    let logoutBtn = document.createElement('button');
    logoutBtn.textContent = "Logout";
    logoutBtn.style.marginTop = "10px";

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem("loggedInUser"); // clear session
        result.innerHTML = "<p>You have logged out.</p>";
    });

    result.appendChild(h1);
    result.appendChild(p);
    result.appendChild(logoutBtn);
}
