import Api from "../server/request.service";

export default {
    // Request to add a new User
    addUser(user) {
        return Api().post("/add", user);
    },

    // Request to add a new User
    getUsers() {
        return Api().get("/users");
    },

    // Request to delete a specific user
    deleteUser(id) {
        return Api().delete(`/user/${id}`);
    },

    // Request to update a specific user
    updateUser(id) {
        return Api().put(`/user/update/${id}`);
    }
}