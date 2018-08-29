let MongoClient = require('mongodb').MongoClient;
let params = require('./../params.json');


let _lastId;

class general {


    constructor(){
        this._initId();
    }

    get _lastId(){
        this._updateLastId();
        return _lastId;
    }


    _initId(){
        MongoClient.connect(params._url+params._db, function(err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["general"]).findOne({"_id":"lastId"}, function(err, result) {
                if (err) throw err;
                // console.log(result.lastId);
                if((!result)||(result.lastId === undefined)){
                    _lastId = 1;
                    dbo.collection(params._collections["general"]).insertOne({"_id":"lastId","lastId":_lastId}, function(err, res) {
                        if (err) throw err;
                        console.log("lastId inserted");
                        db.close();
                    });
                }else {
                    dbo.collection(params._collections["general"]).findOne({"_id": "lastId"}, function (err, result) {
                        _lastId = result.lastId;
                    });
                }
            });
        });
    }

    _updateLastId(){
        MongoClient.connect(params._url+params._db, function(err, db) {
            if (err) throw err;
            var dbo = db.db(params._db);
            dbo.collection(params._collections["general"]).findOne({"_id":"lastId"}, function(err, result) {
                _lastId = result.lastId;
                dbo.collection(params._collections["general"]).update(
                    {_id: "lastId"},
                    {$inc: {lastId: 1}}
                );
            });
        });

    }



}

module.exports = new general();