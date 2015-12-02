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


app.post('/AddressBook/', function (request, response) {
    if(request.body){
        connection.query("insert into AddressBook set name ='"+ request.body.name+"', accountId ="+request.accountId, function(error,result){
            if (error) response.sendStatus(404);
            
            response.send(result);
             
        });        
    }
    else {
        response.sendStatus(404);
    }
 //   var name = request.body.name;
});

app.delete('/delete/AddressBook/:id', function(request, response){

    connection.query("DELETE FROM AddressBook WHERE AddressBook.id='" + request.params.id + "' AND AddressBook.accountId='" + request.body.accountId + "'", function(err, result){
        if(err) throw err;
        console.log(result);
        response.json(result);
        if(result.affectedRows === 0){
            response.status(404).send();
            console.log("\n-----INVALID ACCOUNT ID-----\n");
        }
    });
});


app.put('/AddressBook/:id', function(request, response) {

  connection.query("UPDATE AddressBook SET name = '" + request.body.name + "' WHERE '" + request.params.id +"' = AddressBook.id AND AddressBook.accountId='" + request.accountId +"'", function(err, result){
    if(err) throw err;
    if(result.affectedRows === 0){
        request.status(404).send();
        console.log(result);
    }else{
        request.json(result);
        console.log(result);
    }
    
    });
    
});



app.post('/Entries/:id', function(request, res) {
 
                connection.query("INSERT into Entry (addressbookId, firstName, lastName, birthday) values (" + request.params.id + ',"' + request.body.firstName + '","' + request.body.lastName + '","' + request.body.birthday + '")', function(err, result) {
                    if(err){
                        res.status(404).send(err);
                    }
                   res.json(result);
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
