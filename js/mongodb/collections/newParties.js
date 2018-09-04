let MongoClient = require('mongodb').MongoClient;
let params = require('./../params.json');



class newParties {


    constructor(){

    }


    async getCollection(){

        let db = await MongoClient.connect(params._url+params._db);

        var dbo = db.db(params._db);

        let col= await dbo.collection(params._collections["newParties"]).find({}).toArray();

        // console.log("collection1 ",col);
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


    vote(partyId,userInfo) {
        console.log('vote',partyId,userInfo);
        MongoClient.connect(params._url + params._db, function (err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["newParties"]).updateOne(
                {_id: parseInt(partyId)},
                {$inc: {votes: 1},$push: {userThatVoted: userInfo}}
            ,(err, res)=>{
                    if (err) throw err;
                    db.close();
                });
        });
    }

}

module.exports = new newParties();