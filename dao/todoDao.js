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
                if (result) {
                    params.id = result.insertId;
                }
                jsonWrite(res, params);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var params = req.body;
        pool.getConnection(function(err, connection) {
            connection.query(sql.update, [params.title, params.order, params.done, params.id], function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        var id = req.params.id;
        pool.getConnection(function(err, connection) {
            connection.query(sql.delete, [id], function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryAll, function(err, result) {
                if (result && result.length > 0) {
                    var rows = [];
                    for (var i = 0; i < result.length; i ++) {
                        var row = result[i], obj = {
                            id: row.id,
                            title: row.title,
                            order: row._order,
                            done: row.done == 1
                        };
                        rows.push(obj);
                    }
                    jsonWrite(res, rows);
                } else {
                    jsonWrite(res, []);
                }
                connection.release();
            });
        });
    }
};
