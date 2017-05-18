var express = require('express');
var router = express.Router();
var clone = require('clone');
var extend = require('util')._extend;

function OmitPassword(entry) {
  try {
    delete(entry.password);
  }
  catch(e) {}
  return entry;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.app.get('db');
    var data = [];
    var count = 0;
    var pageSize = 5;
    var offset = 0;
    var sortBy = typeof(req.query.sortBy)=="undefined"?"id":req.query.sortBy;
    var ascending = typeof(req.query.ascending)==="undefined"?true:req.query.ascending=="true";
    var direction = ascending?"ASC":"DESC";
    try {
      pageSize=req.query.pageSize;
      offset=req.query.offset;
    }
    catch(e) {}
    db.serialize(function() {
      sql=`
SELECT
  COUNT(1) AS count
  FROM
    users
`;
      db.each(sql, [], function(err, row) {
        res.setHeader("Angular-Count", row.count);
      });
      sql=`
SELECT
  *
  FROM users
  ORDER BY ${sortBy} ${direction}
  LIMIT $pageSize OFFSET $offset
`;
      var params = {$pageSize:pageSize, $offset:offset};
//console.log(sql, params);
      db.each(sql, params, function(err, row) {
//        console.log(err,row);
        data.push(extend({id:row.id}, OmitPassword(JSON.parse(row.data))));
      },
      function() {
        res.json(data);
      });
    });
});

router.post('/', function(req, res, next) {
  var db = req.app.get('db');
  var data = [];
  db.serialize(function() {
    var sql=`
INSERT INTO users(data) VALUES (?)
`;
    db.run(sql, [JSON.stringify(req.body)], function() {
      res.json(req.body);
    });
  });
});

router.get('/:id', function(req, res, next) {
  var db = req.app.get('db');
  var sql=`
SELECT * FROM users WHERE id=?
`;
  db.each(sql, [req.params.id], function(err, row) {
    res.json(extend({id:row.id}, JSON.parse(row.data)));
  });
});

router.post('/:id', function(req, res, next) {
  var db = req.app.get('db');
  var sql=`
UPDATE users SET data=? WHERE id=?
`;
  try {
    db.run(sql, [JSON.stringify(req.body), req.params.id], function() {
      res.json(req.body);
    });
  }
  catch(e) {
    console.log(e);
  };
});

router.delete('/:id', function(req, res, next) {
  var db = req.app.get('db');
  var sql=`
DELETE FROM users WHERE id=?
`;
  try {
    db.run(sql, [req.params.id], function() {
      res.json({});
    });
  }
  catch(e) {
    console.log(e);
  };
});

module.exports = router;
