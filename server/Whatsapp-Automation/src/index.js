const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
// const qrcode = require('qrcode-terminal');


// const { Client, NoAuth, LegacySessionAuth  } = require('whatsapp-web.js');
// const fs = require('fs');


// const { Client, LocalAuth } = require('whatsapp-web.js');

// Path where the session data will be stored
// const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
// let sessionData;
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }


// const client = new Client({
//     puppeteer: {
//       executablePath: '/usr/bin/brave-browser-stable',
//     },
//     authStrategy: new LocalAuth({
//       clientId: "client-one"
//     }),
//     puppeteer: {
//       headless: false,
//     }
//   });
  

// const client = new Client({
//     authStrategy: new LegacySessionAuth({
//         session: sessionData
//     })
// });
const apiRoute = require('./routes/index');

const {PORT} = require('./config/serverConfig');
const app = express();
app.use(cors());
const ServerSetup = async() => 
{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/api',apiRoute);

    
    // client.on('qr', (qr) => {
    //     console.log('QR RECEIVED', qr);
    //     qrcode.generate(qr, {small: true});
    //     // app.get('/home',(req,res)=>{
    //     //     res.status(200).json({
    //     //         data: qr,
    //     //         succes: true
    //     //     })
    //     // })
    // });
    
    // client.on('ready', async () => {
    //     console.log('Client is ready!');
    //     const contacts = await client?.getContacts();
    //     var SpUser;
    //     for(let i=0;i<contacts.length;i++)
    //     {
    //         const user=contacts[i];
    //         if(user.name.includes('Bhaavya Rampal CSE1 Igdtuw'))
    //         {
    //             SpUser = user;
    //             break;
    //         }
    //     }
    //     client.sendMessage(SpUser.id._serialized,'Hello');
    //     // console.log(contacts);
    // });

     
    
    // client.initialize();
    app.listen(PORT,() => 
    {
        console.log(`Server started at PORT: ${PORT}`);
    })
}

ServerSetup();