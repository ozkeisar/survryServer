const express = require('express')
const app = express()
let bodyParser = require('body-parser');
let partys = require('./js/partys');
let newPartys = require('./js/newPartys');
let clients = require('./js/clients');
let mandateCalculator = require('./js/mandateCalculator');
let db = require('./js/mongodb/mongodb');
// db.newParties.getCollection();

let urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use((request, response, next) => {
    console.log(request.headers)
    next()
})

app.use((request, response, next) => {
    request.chance = Math.random()
    next()
})

// app.get('/', (request, response) => {
//
//     response.json({
//         partys:partys.getPartys()
//     })
// })

app.get('/partys', (request, response) => {
    response.json({
        partys:partys.getPartys()
    })
});
app.get('/newPartys', (request, response) => {
    response.json({
        newPartys:newPartys.getNewPartys()
    })
});


app.post('/add_party', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        name:req.body.name,
    };
    partys.addParty(req.body);
    // console.log('response: ',response);
    res.end(JSON.stringify(response));
});

app.post('/vote_for_new_party', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        name:req.body.name,
    };
    newPartys.voteParty(req.body);
    // console.log('response: ',response);
    res.end(JSON.stringify(response));
});

app.post('/add_new_party', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        name:req.body,
    };
    newPartys.addNewParty(req.body);
    console.log('kk',req.body);
    // console.log('response: ',response);
    res.end(JSON.stringify(response));
});


app.post('/vote', urlencodedParser, function (req, res) {

    partys.unVoteParty(clients.getVotedPartyId(req.body.ipv6));
    clients.updateVote(req.body.ipv6,req.body.partyId);
    partys.voteParty(req.body.partyId);
    // Prepare output in JSON format
    response = {
        first_name: req.body.partyName,
        last_name: req.body.partyId,
        ipv6: req.body.ipv6 //need to get the ipv6

    };

    console.log(response);
    mandateCalculator.splitMandates();
    res.end(JSON.stringify(response));
});
app.listen(3000);
// require('./js/userInterface');