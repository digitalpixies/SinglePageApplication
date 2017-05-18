var express = require('express');
var router = express.Router();

router.get('/createtables', function(req, res, next) {
  var db = req.app.get('db');
  var output = {successful:true};
  var sqls=`
CREATE TABLE IF NOT EXISTS
  users
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT
    , firstname TEXT
    , lastname TEXT
    , password TEXT
    , email TEXT
    , createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
  sqls=sqls.split(';');
  db.serialize(function() {
    for(var i in sqls) {
      var sql = sqls[i];
      db.run(sql, function(err) {
        if(err)
          output.successful=false;
        if(sqls.length==i+1) {
          res.send(output);
        }
      });
    }
  });
});

module.exports = router;
