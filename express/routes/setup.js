var express = require('express');
var router = express.Router();
var extend = require('util')._extend;

router.get('/createtables', function(req, res, next) {
  var db = req.app.get('db');
  var output = {successful:true};
  req.query = extend({dropTableFirst:false}, req.query);
  var sqls="";
  if(req.query.dropTableFirst)
    sqls+=`
DROP TABLE users;
`;
  sqls+=`
CREATE TABLE
  users
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT
    , firstname TEXT
    , lastname TEXT
    , password TEXT
    , salt TEXT
    , email TEXT
    , createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
  sqls=sqls.split(';');
  db.serialize(function() {
    var completed=0;
    for(var i in sqls) {
      var sql = sqls[i];
      if(sql.length<=2) {
        completed++;
        continue;
      }
      db.run(sql, function(err) {
        if(err)
          output.successful=false;
        completed++;
        if(sqls.length==completed) {
          res.send(output);
        }
      });
    }
  });
});

module.exports = router;
