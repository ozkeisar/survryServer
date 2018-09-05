const createNew = require('./createNewObject');
const db = require('./mongodb/mongodb');
const fs = require('fs');

let collection = [];

class newParties {

    constructor(){
        console.log('newParties constructor');
        // this.updateCollection();
        collection = db.newParties.getCollection().then((col)=>{
            collection = col;
        });

    }


    async updateCollection(){
        // console.log('ll',db.newParties.getCollection())
        collection = await db.newParties.getCollection();
    }

    addNewParty(newParty) {
        console.log('name',newParty.name);

        db.newParties.insertNewParty(createNew.newParty(newParty)).then(()=>{
            this.updateCollection();
        });
    }

    getNewParties(){
        return collection;
    }

    voteParty(body){
        // console.log(collection);
        let votedParty = collection.find(p => p._id == body.partyId);
        console.log(votedParty);
        if(!votedParty.userThatVoted.includes(body.userInfo)){
            db.newParties.vote(body.partyId,body.userInfo)
        }else{
            console.log('already voted');
        }
        this.updateCollection();
    }


}

module.exports = new newParties();