/**
 * todo sql mapping
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2016-06-15 18:26:34
 * @version 1.0.0
 */
'use strict';

var todo = {
    insert: 'insert into todos(title, [order], done) values (?,?,?)',
    queryAll: 'select * from todos'
};

module.exports = todo;