let MongoClient = require('mongodb').MongoClient;
let params = require('./params.json');
class mongodb {

    constructor(){
        this._createdb();
        this._createCollections()
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




    addNewParty(newParty){
        console.log('lll',params._collections["newPartys"]);
        MongoClient.connect(params._url+params._db, function(err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["newPartys"]).insertOne(newParty, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }



}

module.exports = new mongodb();