const connect = require("../src/connection");

class Query {
    constructor (connect) {
        this.connect = connect;
    };
    
    viewAllDepartments() {
        return this.connect.promise().query("SELECT * FROM department");
    };

    viewAllRoles() {
        return this.connect.promise().query("SELECT * FROM role");
    };

    viewAllEmployees() {
        return this.connect.promise().query("SELECT * FROM employee");
    };
}

module.exports = new Query(connect);