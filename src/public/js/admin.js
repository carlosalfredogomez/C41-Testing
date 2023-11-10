const form = document.getElementById('productsCrud')




form.addEventListener('submit', e => {
    e.preventDefault()
    const data = {
        title: form.title.valueOf,
        description: form.description.value,
        category: form.category.value,
        price: parseInt(form.price.value),
        stock: parseInt(form.stock.value),
        thumbnail: form.thumbnail.value
    }


    fetch('api/products', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => result.json())
        .then(result => { console.log(result) })
}
)
