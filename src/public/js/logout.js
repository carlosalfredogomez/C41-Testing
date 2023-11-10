const logout = document.getElementById('logout')

logout.addEventListener('click', async () => {
    await fetch('api/sessions/logout', { method: 'POST' })
        .then(res => {
            if (res.status === 200) { window.location.replace('/login') }
        })
})