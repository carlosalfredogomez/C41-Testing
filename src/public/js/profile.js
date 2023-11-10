const token = localStorage.getItem('token')
console.log(token)

fetch('/profile', {
    method: 'GET',
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}).then(res => {
    if (res.status === 401) {
        window.location.replace('/login')
    } else { return res.json() }
}).then(json => {
    const paragraph = document.getElementById('result')
    paragraph.innerHTML = `Hello, your data is ${json.payload.email} y ${json.payload.password}`
})