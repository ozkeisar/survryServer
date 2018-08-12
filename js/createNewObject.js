let fs = require('fs');

class createNewObject {

    constructor() {
        this.generalFilePath = './data/JSONs/general.json';
        this.general = require('./.'+this.generalFilePath);
    }

    party(name) {
        this.general.lastId++;
        this.saveToDB();
        return {
            name:name,
            votes:0,
            mandates:0,
            id: this.general.lastId
        }
    }

        newParty(nParty) {
        console.log('nParty',nParty);
        this.general.lastId++;
        this.saveToDB();
        return {
            name:nParty.partyName,
            partyLeader:nParty.partyLeader,
            partyImageUrl:nParty.imageUrl,
            candidateList:nParty.candidateList,
            creatorInfo: {
                ipv6: nParty.ipv6,
                imei: nParty.imei
            },
            userThatVoted:[],
            votes:1,
            id: this.general.lastId
        }
    }



    client(ipv6,vote) {
        this.general.clientsNum++;
        this.saveToDB();
        return {
            ipv6: ipv6,
            location:{},
            voteTime:new Date(),
            vote: vote,
            num: this.general.clientsNum
        }
    }

    saveToDB(){
        fs.writeFile(this.generalFilePath,JSON.stringify(this.general));
    }

}
module.exports = new createNewObject();