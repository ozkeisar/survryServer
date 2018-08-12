const createNew = require('./createNewObject');
const fs = require('fs');

class clients {

    constructor(){
        this.clientListFilePath = './data/JSONs/clients/clients.json';
        this.clientList = require('./.'+this.clientListFilePath);
        // console.log('clients constructor', this.clientList);
    }

    addClient(ipv6,vote){
        let newClient = createNew.client(ipv6,vote);
        this.clientList.push(newClient);
        this.saveToDB();
    }

    getVotedPartyId(ipv6){
        let client = this.clientList.find(cl=> cl.ipv6 === ipv6);
        return client? client.vote:undefined;
    }

    updateVote(ipv6,newVote){
        let client = this.clientList.find(cl=> cl.ipv6 === ipv6);
        client ? client.vote = newVote : this.addClient(ipv6,newVote);
        this.saveToDB();
    }

    saveToDB(){
        fs.writeFile(this.clientListFilePath,JSON.stringify(this.clientList));
    }

}

module.exports = new clients();