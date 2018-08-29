let MongoClient = require('mongodb').MongoClient;
let params = require('./params.json');
let general = require('./collections/general');
let newParties = require('./collections/newParties');

class mongodb {

    constructor(){
        this._createdb();
        this._createCollections();
        this.general = general;
        this.newParties =newParties;
    }


    _createdb() {

        MongoClient.connect(params._url+params._db, function(err, db) {
            if (err) throw err;
            console.log("Database created!");
            db.close();
        });
    }
    _createCollections(){
        MongoClient.connect(params._url+params._db, function(err, db) {
            if (err) throw err;

            params._collectionList.map((collection,i)=>{
                var dbo = db.db(params._db);
                dbo.createCollection(collection, function (err, res) {
                    if (err) throw err;
                    console.log(collection+" Collection created!");
                    if(i === params._collections.length-1){
                        db.close();
                    }
                });
            })

        })
    }



    // async getId(){
    //     let lastId;
    //     await MongoClient.connect(params._url+params._db, function(err, db) {
    //         if (err) throw err;
    //         var dbo = db.db(params._db);
    //         dbo.collection(params._collections["general"]).findOne({"_id":"lastId"}, function(err, result) {
    //             if (err) throw err;
    //             console.log(result.lastId);
    //             if((!result)||(result.lastId === undefined)){
    //                 lastId = 1;
    //                 dbo.collection(params._collections["general"]).insertOne({"_id":"lastId","lastId":lastId}, function(err, res) {
    //                     if (err) throw err;
    //                     console.log("1 document inserted");
    //                     db.close();
    //                 });
    //             }else{
    //                 console.log('end')
    //                 lastId = result.lastId;
    //                 dbo.collection(params._collections["general"]).update(
    //                     { _id: "lastId" },
    //                     { $inc: { lastId: 1 } }
    //                 );
    //             }
    //         });
    //     });
    // }

    addNewParty(newParty){
        console.log('lll',params._collections["newParties"]);
        MongoClient.connect(params._url+params._db, function(err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["newParties"]).insertOne(newParty, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }



}

module.exports = new mongodb();