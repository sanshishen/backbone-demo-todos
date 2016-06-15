/**
 * todo dao
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2016-06-15 18:05:16
 * @version 1.0.0
 */
'use strict';

var mysql = require('mysql');
var config = require('../config/db');
var sql = require('./todoSqlMapping');

var pool = mysql.createPool(config.mysql);

module.exports = {
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryAll, function(err, result) {
                console.log(result);
                connection.release();
            });
        });
    }
};
