const createNew = require('./createNewObject');
const db = require('./mongodb/mongodb');
const fs = require('fs');

let collection;

class newPartys {

    constructor(){
        console.log('newParties constructor');
        this.updateCollection();
    }


    updateCollection(){
        collection = db.newParties.getCollection();
    }

    addNewParty(newParty) {
        console.log('name',newParty.name);

        db.newParties.insertNewParty(createNew.newParty(newParty));
    }

    getNewParties(){
        return collection;
    }

    voteParty(body){
        let votedParty = collection.find(p => p.id == body.partyId);
        console.log(votedParty);
        if(!votedParty.userThatVoted.includes(body.userInfo)){
            db.newParties.vote(body.partyId)
        }else{
            console.log('already voted');
        }
        this.updateCollection();
    }


}

module.exports = new newPartys();