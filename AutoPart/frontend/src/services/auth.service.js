import http from "../http_common";

class AuthService {

    register(data) {
        return http.post("api/account/register", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new AuthService();