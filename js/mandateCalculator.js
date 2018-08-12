let partys = require('./partys');
const fs = require('fs');

class mandateCalculator {


    constructor(){
        console.log('mandateCalculator constructor');
        this.partys = partys.getPartys();
        this.blockedPercent = 3.25;
        this.generalMode = undefined;
        this.blockedVotes = undefined;
        this.allVotes = 0;
        this.validVotes = 0;
        this.validPartys = [];
        this.unValidPartys =[];
    }

    countAllVotes(){
        this.allVotes = 0;
        this.partys.forEach((party)=>{
            this.allVotes += party.votes;
            console.log(party.name,party.votes);
        });
        console.log('all = ',this.allVotes);
    }

    calculateBlockedPercent(){
        this.countAllVotes();
        this.blockedVotes = (this.allVotes * this.blockedPercent) / 100;
        console.log('blockedVotes = ',this.blockedVotes);
    }

    filterPartys() {
        this.calculateBlockedPercent();
        this.validPartys = this.partys.filter( p=> p.votes > this.blockedVotes);
        this.unValidPartys = this.partys.filter( p=> p.votes <= this.blockedVotes);
        console.log('validPartys',this.validPartys);
        console.log('unValidPartys',this.unValidPartys);
    }

    countAllValidVotes(){
        this.validVotes = 0;
        this.filterPartys();
        this.validPartys.forEach((party)=>{
            this.validVotes += party.votes;
            console.log(party.name,party.votes);
        });
        console.log('countAllVotes = ',this.validVotes);
    }

    splitMandates() {
        this.countAllValidVotes();
        this.generalMode = this.validVotes / 120;
        console.log('generalMode',this.generalMode);
        this.validPartys.forEach((p)=>{
            p.mandates = p.votes / this.generalMode;
            console.log(p.name,p.mandates);
        })
        partys.saveToDB();
    }


}

module.exports = new mandateCalculator();