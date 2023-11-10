const form = document.getElementById('registerForm')

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        email: form.email.value,
        age: form.age.value,
        password: form.password.value
    };

    fetch('api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            if (result.status === 200) {
                console.log("Redirecting...");
                alert('Account created. Now log in bastard.')
                window.location.replace('/login');
            }
            if (result.status === 400) { alert('User already exists.') }
        })
});
