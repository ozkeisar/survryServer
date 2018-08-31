let fs = require('fs');

let general = require('./mongodb/collections/general');

class createNewObject {

    constructor() {

    }

    party(name) {
        return {
            name: name,
            votes: 0,
            mandates: 0,
            userThatVoted:[],
            _id: general._lastId
        }
    }

    newParty(nParty) {
        console.log('nParty', nParty);
        // this.general.lastId++;
        // this.saveToDB();
        return {
            name: nParty.partyName,
            partyLeader: nParty.partyLeader,
            partyImageUrl: nParty.imageUrl,
            candidateList: nParty.candidateList,
            creatorInfo: {
                ipv6: nParty.ipv6,
                imei: nParty.imei
            },
            userThatVoted: [{
                ipv6: nParty.ipv6,
                imei: nParty.imei
            }],
            votes: 1,
            _id: general._lastId
        }
    }


    client(userInfo, vote) {

        return {
            userInfo: userInfo,
            location:{},
            createOn:new Date(),
            voteHistory:[],
            currentVote: vote,
            _id: general._lastId
        }
    }

}
module.exports = new createNewObject();