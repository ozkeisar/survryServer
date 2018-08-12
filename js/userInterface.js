const readline = require('readline');
let partys = require('./partys');
let clients = require('./clients');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\ncommand: '
});


rl.prompt();

rl.on('line', (line) => {
    // console.log(`Received: ${line}`);
   command(line);
    // rl.prompt();
});


function searchParty() {

    let rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'set the party name:'
    });


    rl2.on('line', (line) => {
        // console.log(`Received: ${line}`);
        if(line === 'back'){
            rl2.close();
            rl.prompt();
        }else {
            console.log(partys.getPartys().find(p => {
                p.name === line
            }));
            rl2.prompt();
        }
    });


    rl2.prompt();
}

function command(commandName) {


    switch(commandName) {
        case 'get clients':
            console.log(clients.clientList);
            break;
        case 'client':
            console.log('set the client name');
            break;
        case 'get partys':
            console.log(partys.getPartys());
            break;
        case 'party':
            rl.close();
            // rl.pause();
            searchParty();
            break;
        case 'exit':
            console.log(`\n-shutting down the server-`);
            process.exit(0);
            break;
        default:
            console.log(`the command ${commandName} not exist`);
            rl.prompt();
    }
}