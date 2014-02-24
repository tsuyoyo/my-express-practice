var mysql = require('mysql');
var config = require('../config');

// ModelBase: base class of ModelBase
var Database = function () {};

// Store the authentication fo database.
Database.prototype.dbAuth = config.databaseAuth;

// Create MySQL client object
Database.prototype._getClient = function() {
	if (this.client === undefined) {
		this.client = mysql.createConnection(this.dbAuth);
	}
	return this.client;
};

// Execute query
Database.prototype.query = function(query, params, callback) {
	var client = this._getClient();
	return client.query(query, params, callback);
}

// End query
Database.prototype.end = function (callback) {
	if (this.client) {
		this.client.end(callback);
		delete this.client:
	}
}

// Create the instance of Database
function createClient() {
	return new Database();
}

exports.createClient = createClient;
