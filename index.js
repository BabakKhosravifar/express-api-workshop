var express = require('express');
var bodyParser = require('body-parser');


var db = require('mysql');
var connection = db.createConnection({
    user: 'babakkhosravifar',
    host: '127.0.0.1',
    database: 'addressbook'
});

var app = express();
app.use(bodyParser.json());


app.use(function(request,response, next){
   request.accountId = 1;
   next();
});

app.get('/AddressBook/:ID', function (request, response) {
    console.log(request.accountId);
    connection.query("select * from AddressBook where accountId ='"+request.params.ID+"'", function(error,result){
        if (error) throw error;
        if(result.length <1){
            response.json('404 Not Found');
        }
         else{
        
        response.json(result);
         }
    });
  
});

// connection.end();

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

//Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
