import ProductsService from '../service/products.service.js';
import ProductDTO from '../models/DTO/product.dto.js';


class ProductController {

    getAll = async (req, res) => {
        try {
            let allProducts = await ProductsService.getAll()
            res.status(200).send({ total: allProducts.length, payload: allProducts })
        } catch (error) {
            res.status(500).send({ status: 'Error 500', message: error.message });
        }
    }

    //GET PRODUCT BY ID
    getProductById = async (req, res) => {
        try {
            const pid = req.params.pid

            let foundProduct = await ProductsService.getProductById(pid)
            if (!foundProduct) return res.status(404).send({ status: 'failed.', message: `Product ${pid} not found in db.` })
            res.status(200).send(foundProduct)
        } catch (error) {
            res.status(500).send({ status: 'Error 500', message: error.message });
        }
    }

    //NEW PRODUCT
    createProduct = async (req, res) => {
        try {
            let newProduct = req.body
            newProduct.owner = (req.session.role === 'admin' ? req.session.role : req.session.user.email)

            const completeProduct = new ProductDTO(newProduct)

            const response = await ProductsService.createProduct(completeProduct)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send({ status: 'Error 500', message: error.message });
        }
    }

    //UPDATE PRODUCT
    updateProduct = async (req, res) => {
        try {
            const pid = req.params.pid
            const newData = req.body
            const user = req.session.user

            const response = await ProductsService.updateProduct(pid, newData, user);
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    };

    //DELETE PRODUCT
    deleteProduct = async (req, res) => {
        try {
            const pid = req.params.pid
            const user = req.session.user
            const response = await ProductsService.deleteProduct(pid, user)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    };

}

export default new ProductController()
