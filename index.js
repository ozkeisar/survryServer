const express = require('express');
const bodyParser = require('body-parser');
const parties = require('./js/partiesHendler');
const clients = require('./js/clientsHendler');
const path = require('path');
// let mandateCalculator = require('./js/mandateCalculator');
let db = require('./js/mongodb/mongodb');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const app = express();

app.use((request, response, next) => {
    console.log(request.headers);
    next();
});

app.use((request, response, next) => {
    request.chance = Math.random();
    next();
});

app.get("/menage", (request, response) => {
    response.sendFile(path.join(__dirname + '/templateTest.html'));
});

app.get('/parties', async (request, response) => {
    console.log(await parties.getParties());
    response.json({
        parties: await parties.getParties()
    })
});

app.post(urlencodedParser);

app.post('/add_party', function (req, res) {
    // Prepare output in JSON format
    response = {
        body: req.body,
    };
    parties.addParty(req.body);
    // console.log('body: ',req.body);
    res.end(JSON.stringify(response));
});


app.post('/register', async function (req, res) {

    let _id = await clients.addClient(req.body);
    response = {
        body: req.body,
        _id: _id
    };

    console.log('res', response);
    res.end(JSON.stringify(response));


});


app.post('/vote', function (req, res) {


    clients.vote(req.body.userInfo, req.body.partyId);
    // Prepare output in JSON format
    response = {
        first_name: req.body.partyName,
        last_name: req.body.partyId,
        ipv6: req.body.userInfo //need to get the ipv6

    };

    console.log(response);
    res.end(JSON.stringify(response));
});
app.listen(3000);

// mandateCalculator.splitMandates();
