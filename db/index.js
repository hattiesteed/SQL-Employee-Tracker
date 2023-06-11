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
        'SELECT * FROM ROLE'
    );
    }
    viewAllEmployees() {
        return this.connection.promise().query(
            'SELECT * FROM EMPLOYEE'
        );
    }
    addDepartment(DEPARTMENT) {
        return this.connection.promise().query(
            'INSERT INTO DEPARTMENT SET ?', DEPARTMENT
        );
    }
    addRole(ROLE) {
        return this.connection.promise().query(
            'INSERT INTO ROLE SET ?', ROLE
        );
    }
    addEmployee(EMPLOYEE) {
        return this.connection.promise().query(
            'INSERT INTO EMPLOYEE SET ?', EMPLOYEE
        );
    }
    updateEmployeeRole(EMPLOYEEid, roleID) {
        return this.connection.promise().query(
            'UPDATE EMPLOYEE SET ROLE_ID = ? WHERE ID = ?', [roleID, EMPLOYEEid]
        );
    }
    // ends the connection
    endConnection() {
    this.connection.end();
    }
}
module.exports = new DB();