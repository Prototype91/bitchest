import Api from "./request.service";

export default {
    login(email, password) {
        return Api().post("/login", { email, password });
    },

    addUser(user) {
        return Api().post("/admin", user);
    },

    logout() {
        return Api().post("/logout");
    },
};