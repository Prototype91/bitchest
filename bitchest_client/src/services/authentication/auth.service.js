import Api from "../server/request.service";

// Authentication Service
export default {
    // Login
    login(email, password) {
        return Api().post("/login", { email, password });
    },
    // Logout
    logout() {
        return Api().post("/logout");
    },
};