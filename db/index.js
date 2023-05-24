const MySqlconnection = require('../connection');

class DB {
    constructor() {
        this.connection = MySqlconnection;
    }
    viewAllDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM DEPARTMENT'
        );
    }
    viewAllRoles() {
        return this.connection.promise().query(
            
        )
    }
}