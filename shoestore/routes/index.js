var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/',function(req,res){
  req.protocol.getConnection(function(err,connection){
    if (err) {
      res.sendStatus(500);
    }
  });
});

// gets shoes
router.get('/shoes', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
      if (err) {
        console.error('Error getting connection:', err);
        res.sendStatus(500);
        return;
      }
      var query = "SELECT brand.brand, style.style, size.size, shoe.price, shoe.name, shoe.image FROM shoe INNER JOIN brand ON shoe.brandID = brand.brandID INNER JOIN style ON style.styleID = shoe.styleID INNER JOIN size ON size.sizeID = shoe.sizeID;";
      connection.query(query, function(err, rows, fields) {
        connection.release();
        if (err) {
          console.error('Error executing query:', err);
          res.sendStatus(500);
          return;
        }
        res.json(rows);
      });
  });
});

// gets shoes with filters
router.get('/shoesFilter', function(req, res, next) {
  req.pool.getConnection(function(err, connection) {
      if (err) {
        console.error('Error getting connection:', err);
        res.sendStatus(500);
        return;
      }
      var query = "SELECT brand.brand, style.style, size.size, shoe.price, shoe.name, shoe.image FROM shoe INNER JOIN brand ON shoe.brandID = brand.brandID INNER JOIN style ON style.styleID = shoe.styleID INNER JOIN size ON size.sizeID = shoe.sizeID;";
      connection.query(query, function(err, rows, fields) {
        connection.release();
        if (err) {
          console.error('Error executing query:', err);
          res.sendStatus(500);
          return;
        }
        res.json(rows);
      });
  });
});

module.exports = router;
