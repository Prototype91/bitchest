import Api from "../server/request.service";

export default {
    login(email, password) {
        return Api().post("/login", { email, password });
    },

    logout() {
        return Api().post("/logout");
    },
};