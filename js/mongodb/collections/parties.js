let MongoClient = require('mongodb').MongoClient;
let params = require('./../params.json');



class parties {


    constructor(){

    }


    async getCollection(){

        let db = await MongoClient.connect(params._url+params._db);

        var dbo = db.db(params._db);

        let col= await dbo.collection(params._collections["parties"]).findOne({"_id":/$/});

        console.log("collection1 ",col);
        db.close();

        return col;
    }


    async insertParty(newParty){

        let db = await MongoClient.connect(params._url+params._db);

        var dbo = db.db(params._db);

        let col= await dbo.collection(params._collections["parties"]).insertOne(newParty);

        console.log("party inserted ",col.ops);
        db.close();
    }


    vote(partyId) {
        MongoClient.connect(params._url + params._db, function (err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["parties"]).update(
                {_id: partyId},
                {$inc: {votes: 1}}
            );
        });
    }

    unVote(partyId){
        MongoClient.connect(params._url + params._db, function (err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["parties"]).update(
                {_id: partyId},
                {$inc: {votes: -1}}
            );
        });
    }

}

module.exports = new parties();