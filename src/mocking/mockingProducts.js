import { faker } from '@faker-js/faker'
import { randProductCategory } from '@ngneat/falso';

const createProducts = async (quantity) => {
    const products = []
    for (let i = 0; i < quantity; i++) {
        const randProduct = {
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            category: randProductCategory(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({ min: 2, max: 900 }),
            thumbnail: faker.image.urlLoremFlickr(),
            code: faker.number.hex({ min: 0, max: 655356 }),
            stock: faker.number.int({ min: 15, max: 100 })
        }
        products.push(randProduct)
    }
    return products
}

export default createProducts