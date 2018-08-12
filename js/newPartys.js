const createNew = require('./createNewObject');
const fs = require('fs');

class newPartys {

    constructor(){
        this.newPartyListFilePath = './data/JSONs/partys/newPartys.json';
        this.newPartyList = require('./.'+this.newPartyListFilePath);
        console.log('newPartys constructor', this.newPartyList);
    }


    addNewParty(newParty) {
        console.log('name',newParty.name);

        let newPartyObject = createNew.newParty(newParty);

        console.log('newPArtyObject',newPartyObject);

        this.newPartyList.push(newPartyObject);

        console.log('partyList:',this.newPartyList);

        this.saveToDB();
    }

    getNewPartys(){
        return this.newPartyList;
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