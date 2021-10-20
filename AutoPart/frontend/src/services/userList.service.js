import http from '../http_common';

class UserListService {
    getdata(data) {
        return http.get("api/users", data);        
    }  
}

export default new UserListService();