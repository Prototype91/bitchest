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

    // Request to delete a specifi user
    deleteUser(id) {
        return Api().delete(`/user/${id}`);
    }
}