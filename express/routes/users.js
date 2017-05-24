var express = require('express');
var router = express.Router();
var clone = require('clone');
var extend = require('util')._extend;
var md5 = require('crypto-js/md5');
var sha1 = require('crypto-js/sha1');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.app.get('db');
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
      db.get(sql, {}, function(err, row) {
        if(err)
          return;
        res.setHeader("Angular-Count", row.count);
      });
      sql=`
SELECT
    id,
    firstname,
    lastname,
    email
  FROM
    users
  ORDER BY ${sortBy} ${direction}
  LIMIT $pageSize OFFSET $offset
`;
      var params = {$pageSize:pageSize, $offset:offset};
//console.log(sql, params);
      db.all(sql, params, function(err, rows) {
        if(err) {
          return;
        }
        if(!rows) {
          return;
        }
        res.json(rows);
      });
    });
});

router.post('/', function(req, res, next) {
  var db = req.app.get('db');
  var data = [];
  var params = {
    $firstname:"",
    $lastname:"",
    $password:"",
    $salt:"",
    $email:""
  };
  for(var i in req.body) {
    switch(i) {
      case "firstname":
      case "lastname":
      case "email":
        params["$"+i]=req.body[i];
        break;
      case "password":
        params.$salt=md5(Math.random()).toString();
        params.$password=sha1(params.$salt+sha1(req.body.password).toString()).toString();
        break;
    }
  }
  db.serialize(function() {
    var sql=`
INSERT INTO
  users (
    firstname,
    lastname,
    password,
    salt,
    email
  ) VALUES (
    $firstname,
    $lastname,
    $password,
    $salt,
    $email
  )
`;
    db.run(sql, params, function(err) {
      if(err) {
      }
      res.json({});
    });
  });
});

router.get('/:id', function(req, res, next) {
  var db = req.app.get('db');
  var sql=`
SELECT
    id,
    firstname,
    lastname,
    email,
  FROM
    users
  WHERE
    id=$id
`;
  db.get(sql, {$id:req.params.id}, function(err, row) {
    if(err) {
      res.json({});
      return;
    }
    res.json(row);
  });
});

router.post('/:id', function(req, res, next) {
  var db = req.app.get('db');
  var params = {
    $id:req.params.id,
    $firstname:"",
    $lastname:"",
    $email:""
  };
  var passwordFields="";
  for(var i in req.body) {
    switch(i) {
      case "firstname":
      case "lastname":
      case "email":
        params["$"+i]=req.body[i];
        break;
      case "password":
        if(req.body.password.length==0)
          continue;
        params.$salt=md5(Math.random()).toString();
        params.$password=sha1(params.$salt+sha1(req.body.password).toString()).toString();
        passwordFields=`
  password=$password,
  salt=$salt,
`;
        break;
    }
  }
  var sql=`
UPDATE
  users
  SET
    firstname=$firstname,
    lastname=$lastname,
    ${passwordFields}
    email=$email
  WHERE id=$id
`;
  db.run(sql, params, function(err) {
    if(err) {
    }
    res.json({});
  });
});

router.delete('/:id', function(req, res, next) {
  var db = req.app.get('db');
  var sql=`
DELETE FROM users WHERE id=?
`;
  try {
    db.run(sql, [req.params.id], function(err) {
      if(err) {
      }
      res.json({});
    });
  }
  catch(e) {
    console.log(e);
  };
});

module.exports = router;
