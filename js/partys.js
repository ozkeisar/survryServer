const createNew = require('./createNewObject');
const fs = require('fs');

class Partys {

    constructor(){
        this.partyListFilePath = './data/JSONs/partys/partys.json';
        this.partyList = require('./.'+this.partyListFilePath);
        // console.log('Partys constructor', this.partyList);
    }


    addParty(newParty) {
        console.log('name',newParty.name);

        let newPArtyObject = createNew.party(newParty.name);

        console.log('newPArtyObject',newPArtyObject);

        this.partyList.push(newPArtyObject);

        console.log('partyList:',this.partyList);

        this.saveToDB();
    }

    getPartys(){
        return this.partyList;
    }

    voteParty(partyId){
        let votedParty = (this.partyList).find(p => p.id == partyId);
        console.log(votedParty);
        votedParty.votes++;
        console.log(votedParty);
        this.saveToDB();
    }

    unVoteParty(partyId){
        if(partyId) {
            let votedParty = (this.partyList).find(p => p.id == partyId);
            console.log(votedParty);
            votedParty.votes--;
            console.log(votedParty);
            this.saveToDB();
        }
    }

    saveToDB(){
        fs.writeFile(this.partyListFilePath,JSON.stringify(this.partyList));
    }

}

module.exports = new Partys();