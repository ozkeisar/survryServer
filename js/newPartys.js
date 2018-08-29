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
        let votedParty = (this.newPartyList).find(p => p.id == body.partyId);
        console.log(votedParty);
        if(!votedParty.userThatVoted.includes(body.userInfo)){
            votedParty.votes++;
        }else{
            console.log('already voted');
        }

        console.log(votedParty);
        this.saveToDB();
    }



    saveToDB(){
        fs.writeFile(this.newPartyListFilePath,JSON.stringify(this.newPartyList));
    }

}

module.exports = new newPartys();