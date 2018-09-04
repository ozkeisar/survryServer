const express = require('express')
const app = express()
let bodyParser = require('body-parser');
let parties = require('./js/partiesHendler');
let newParties = require('./js/newPartiesHendler');
let clients = require('./js/clientsHendler');
// let mandateCalculator = require('./js/mandateCalculator');
let db = require('./js/mongodb/mongodb');
// db.newParties.getCollection();

let urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use((request, response, next) => {
    console.log(request.headers)
    next()
})

app.use((request, response, next) => {
    request.chance = Math.random()
    next()
})


app.get('/parties', async (request, response) => {
    response.json({
        parties:await parties.getParties()
    })
});
app.get('/newParties', async(request, response) => {
    response.json({
        newParties:await newParties.getNewParties()
    })
});


app.post('/add_party', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        name:req.body.name,
    };
    parties.addParty(req.body);
    // console.log('body: ',req.body);
    res.end(JSON.stringify(response));
});

app.post('/vote_for_new_party', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        name:req.body.name,
    };
    newParties.voteParty(req.body);
    // console.log('response: ',response);
    res.end(JSON.stringify(response));
});

app.post('/add_new_party', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        name:req.body,
    };
    // newPartys.addNewParty(req.body);
    // console.log('kk',req.body);
    // console.log('response: ',response);
    res.end(JSON.stringify(response));
});



app.post('/register', urlencodedParser, function (req, res) {


    clients.addClient({ipv6:req.body.ipv6,name:req.body.fullName});

    response = {
        first_name: req.body.fullName,
        last_name: req.body.partyId,
        ipv6: req.body.ipv6 //need to get the ipv6

    };

    console.log(response);
    res.end(JSON.stringify(response));
});


app.post('/vote', urlencodedParser, function (req, res) {

    // partys.unVoteParty(clients.getUserVotedPartyId(req.body.ipv6));
    // clients.updateVote(req.body.ipv6,req.body.partyId);
    // partys.voteParty(req.body.partyId);
    // Prepare output in JSON format
    response = {
        first_name: req.body.partyName,
        last_name: req.body.partyId,
        ipv6: req.body.ipv6 //need to get the ipv6

    };

    console.log(response);
    res.end(JSON.stringify(response));
});
app.listen(3000);

// mandateCalculator.splitMandates();
