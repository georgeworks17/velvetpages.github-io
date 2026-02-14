// Supabase init (put at very top of script.js)
const supabaseUrl ='https://mixbzxuispkowhatbhxl.supabase.co'; // ← paste from dashboard → Settings → API
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1peGJ6eHVpc3Brb3doYXRiaHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5Nzg1MjgsImV4cCI6MjA4NjU1NDUyOH0.vYVsu5rmuu1pm4ubdEJerSRQtDY2vXiUdy22kCzEt_A';      // your anon key
const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);

// ------------------ Auth logic ------------------

const authForm = document.getElementById('auth-form');
const toggleLink = document.getElementById('toggle-link');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const message = document.getElementById('message');

let isSignup = false;

if (toggleLink) {
  toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isSignup = !isSignup;
    formTitle.textContent = isSignup ? 'Sign Up' : 'Log In';
    submitBtn.textContent = isSignup ? 'Sign Up' : 'Log In';
    toggleLink.textContent = isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up";
    message.textContent = '';
  });
}

if (authForm) {
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    message.textContent = '';

    let result;

    if (isSignup) {
      result = await supabase.auth.signUp({ email, password });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    if (result.error) {
      message.textContent = result.error.message;
      message.style.color = 'red';
    } else {
      message.textContent = isSignup ? 'Signed up! Check your email (if confirmation is on)' : 'Logged in successfully!';
      message.style.color = 'green';

      // Redirect after success (change to your main page)
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
  });
}

// Optional: Check if already logged in (show/hide things)
supabase.auth.getUser().then(({ data: { user } }) => {
  if (user) {
    console.log('Already logged in as:', user.email);
    // Example: hide login link in nav, show "Welcome" or logout button
  }
});
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'login.html';  // or index.html
  });
}