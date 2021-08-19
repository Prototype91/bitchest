import Api from "../server/request.service";

export default {
    // Request to add a new User
    addUser(user) {
        return Api().post("/admin", user);
    },
}