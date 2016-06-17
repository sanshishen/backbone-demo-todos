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

var jsonWrite = function(res, result) {
    if (typeof result === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(result);
    }
}

module.exports = {
    insert: function(req, res, next) {
        var params = req.body;
        pool.getConnection(function(err, connection) {
            connection.query(sql.insert, [params.title, params.order, params.done], function(err, result) {
                console.log(err, result);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
};
