import bcrypt from 'bcrypt';
import cartsDao from '../daos/carts.dao.js';

class UsersDTO {
  constructor() {
    this.first_name = null;
    this.last_name = null;
    this.age = null;
    this.email = null;
    this.password = null;
    this.cartId = null;
    this.role = null
  }

  async createUser(userRegisterData) {
    const user = new UsersDTO();
    user.first_name = userRegisterData.first_name;
    user.last_name = userRegisterData.last_name;
    user.age = userRegisterData.age;
    user.email = userRegisterData.email;
    user.password = await this.createHash(userRegisterData.password);
    user.cartId = await this.createCartForUser();
    user.role = userRegisterData.role
    return user;
  }

  async createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  async createCartForUser() {
    try {
      const cartCreationResult = await cartsDao.createCart();
      if (cartCreationResult.status === 200) {
        return cartCreationResult.payload._id
      } else {
        throw new Error('Failed to create a cart for the user.');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new UsersDTO()