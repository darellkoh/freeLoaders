'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');
var Product = require('./models/products');

var Review = require('./models/reviews');
var OrderItem = require('./models/orderItem');
var Order = require('./models/order');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

User.hasMany( Review );
User.hasMany( Order );

Product.hasMany( Review );

OrderItem.belongsTo( User );
OrderItem.belongsTo( Product );
OrderItem.belongsTo( Order );

Order.belongsTo( User );
Order.hasMany( OrderItem );
Product.hasMany( OrderItem );
// Order.belongsToMany( Product, {through: OrderItem});
// Product.belongsToMany( Order, {through: OrderItem});

Review.belongsTo( User );
Review.belongsTo( Product );


Tag.belongsToMany(Product, { through: ProductTags });

