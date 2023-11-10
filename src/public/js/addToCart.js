document.addEventListener('DOMContentLoaded', () => {



    //NO ESCENCIAL



    const addToCartButtons = document.querySelectorAll('#addToCart')
    // Add a click event listener to each button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the product's ID from a data attribute on the button
            const productId = button.dataset.productId;

            // Make a fetch request to add the product to the cart using the productId
            fetch(`http://localhost:8080/api/tickets/${productId}/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response, e.g., display a success message
                    console.log('Response is:', data);
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error adding product to cart:', error);
                });
        });
    });
})

