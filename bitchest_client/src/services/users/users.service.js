import Api from "../server/request.service";

export default {
    // Request to get Users
    getUsers() {
        return Api().get("/users");
    },

    // Request to get a specific user
    getUser(id) {
        return Api().get(`/user/${id}`);
    },

    // Request to add a new User
    addUser(user) {
        return Api().post("/user", user);
    },

    // Request to delete a specific user
    deleteUser(id) {
        return Api().delete(`/user/${id}`);
    },

    // Request to update a specific user
    updateUser(id, userData, updatePassword) {
        return updatePassword ? Api().put(`/loggedUser/${id}`, userData) : Api().put(`/user/${id}`, userData)
    }
};