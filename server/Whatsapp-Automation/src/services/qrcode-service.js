const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
      executablePath: '/usr/bin/brave-browser-stable',
    },
    authStrategy: new LocalAuth({
      clientId: "client-one"
    }),
    puppeteer: {
      headless: false,
    }
  });
  
class WhatsappServices {
    async generateQR(data)
    {
        try {
            var qrcode;
            client.on('qr', (qr) => {
                qrcode=qr;
                console.log('QR RECEIVED', qr);
                qrcode.generate(qr, {small: true});
            });
            
            client.on('ready', async () => {
                console.log('Client is ready!');
                const contacts = await client?.getContacts();
                const UsersList=data.Users;
                for(let i=0;i<UsersList.length;i++)
                {
                    var SpUser;
                    for(let j=0;j<contacts.length;j++)
                    {
                        const contact=contacts[j];
                        if(contact.name.includes(UsersList[i].value))
                        {
                            SpUser = contact;
                            break;
                        }
                    }
                    // await client.sendMessage(SpUser.id._serialized,'Hello!!!!!!!!');
                    try {
                        await client.sendMessage(SpUser.id._serialized,data.Message);
                        console.log('Message Sent successfully');
                    } catch (error) {
                        console.log('Could not send the message');
                        throw error;
                    }
                }
                // console.log(contacts);
            });
            client.initialize();
            return qrcode;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    // async sendMessage(user)
    // {
    //     try {
    //         client.on('ready', async () => {
    //             console.log('Client is ready!');
    //             const contacts = await client?.getContacts();
    //             var SpUser;
    //             for(let i=0;i<contacts.length;i++)
    //             {
    //                 const user=contacts[i];
    //                 if(user.name.includes('Bhaavya Rampal CSE1 Igdtuw'))
    //                 {
    //                     SpUser = user;
    //                     break;
    //                 }
    //             }
    //             client.sendMessage(SpUser.id._serialized,'Hello');
    //             // console.log(contacts);
    //         });
    //         // client.initialize();
    //         return true;
    //     } catch (error) {
            
    //     }
    // }
}
module.exports=WhatsappServices;