const connect = require("../src/connection");

class Query {
    constructor (connect) {
        this.connect = connect;
    }
    
    viewAllDepartments() {
        return this.connect.promise().query("SELECT * FROM department")
    }

}

module.exports = new Query(connect);