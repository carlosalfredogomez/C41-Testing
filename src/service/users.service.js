import usersDao from "../models/daos/users.dao.js";
import UsersDTO from '../models/DTO/user.dto.js'
import bcrypt from 'bcrypt';

class UserService {
    getAll = async () => {
        try {
            let users = await usersDao.getAll()
            return users
        } catch (error) {
            throw error
        }

    };

    async getUserById(uid) {
        try {
            const user = await usersDao.getUserById(uid)
            return user;
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await usersDao.getUserByEmail(email)
            return user
        } catch (error) {
            throw error
        }
    }

    async updateUser(newData) {
        try {
            const result = await usersDao.updateUser(newData)
            return result
        } catch (error) {
            throw error
        }
    }

    async changeRole(uid) {
        try {
            const result = await usersDao.changeRole(uid)
            return result
        } catch (error) {
            throw error
        }
    }

    async createUser(userRegisterData) {
        try {
            const newUser = await UsersDTO.createUser(userRegisterData)
            let result = await usersDao.createUser(newUser);
            return result;
        } catch (error) {
            throw error
        }
    }

    async deleteUser(uid) {
        try {
            const response = await usersDao.deleteUser(uid)
            return response === null ? { status: 'error', message: 'User not found' } : response
        } catch (error) {
            throw error
        }
    }


}

export default new UserService();
