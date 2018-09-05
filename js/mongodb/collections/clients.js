let MongoClient = require('mongodb').MongoClient;
let params = require('./../params.json');



class clients {


    constructor(){

    }


    async getCollection(){

        let db = await MongoClient.connect(params._url+params._db);

        var dbo = db.db(params._db);

        let col= await dbo.collection(params._collections["clients"]).findOne({"_id":/$/});

        // console.log("client collection1 ",col);
        db.close();

        return col;
    }


    async insertNewClient(newClient){

        let db = await MongoClient.connect(params._url+params._db);

        var dbo = db.db(params._db);

        let col= await dbo.collection(params._collections["clients"]).insertOne(newClient);

        console.log("new client inserted ",col.ops);
        db.close();
    }


    addVoteToHistory(partyInfo){

    }

    vote(client,partyInfo) {
        MongoClient.connect(params._url + params._db, function (err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["clients"]).update(
                {_id: client._id},
                {currentVote: partyInfo}
            );
        });
    }

    updateCurrentVote(){

    }

}

module.exports = new clients();