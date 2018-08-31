let MongoClient = require('mongodb').MongoClient;
let params = require('./../params.json');



class newParties {


    constructor(){

    }


    async getCollection(){

        let db = await MongoClient.connect(params._url+params._db);

        var dbo = db.db(params._db);

        let col= await dbo.collection(params._collections["newParties"]).findOne({"_id":/$/});

        console.log("collection1 ",col);
        db.close();

        return col;
    }


    async insertNewParty(newParty){

        let db = await MongoClient.connect(params._url+params._db);

        var dbo = db.db(params._db);

        let col= await dbo.collection(params._collections["newParties"]).insertOne(newParty);

        console.log("new party inserted ",col.ops);
        db.close();
    }


    vote(partyId) {
        MongoClient.connect(params._url + params._db, function (err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["newParties"]).update(
                {_id: partyId},
                {$inc: {votes: 1}}
            );
        });
    }

}

module.exports = new newParties();