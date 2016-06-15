/**
 * todos router
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2016-06-03 16:15:39
 * @version 1.0.0
 */
'use strict';

var express = require('express');
var router = express.Router();
var dao = require('../dao/todoDao');

router.route('/todo')
    .get(function(req, res, next) {
        console.log('/todo get');
    })
    .post(function(req, res, next) {
        console.log('/todo post');
    });

router.route('/todos')
    .get(function(req, res, next) {
        console.log('/todos get');
        dao.queryAll(req, res, next);
    });

module.exports = router;