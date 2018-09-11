let fs = require('fs');

let general = require('./mongodb/collections/general');

class createNewObject {

    constructor() {

    }

    party(party) {
        return {
            name: party.name,
            partyLeader:party.partyLeader,
            votes: 0,
            mandates: 0,
            userThatVoted:[],
            partyImageUrl: party.imageUrl,
            candidate:party.candidate,
            _id: general._lastId
        }
    }


    client(userInfo, location,phoneNumber) {

        return {
            userInfo: userInfo,
            location:location,
            phoneNumber:phoneNumber,
            createOn:new Date(),
            voteHistory:[],
            currentVote: undefined,
            _id: general._lastId
        }
    }

}
module.exports = new createNewObject();