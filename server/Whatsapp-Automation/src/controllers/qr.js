const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

const WhatsappServices = require('../services/qrcode-service');
const whatsappServices = new WhatsappServices();
const generateQRCode = async(req,res) => {
    try {
        console.log(req.body);
        const response = whatsappServices.generateQR(req.body);
        return res.status(200).json({
            data:response,
            success: true,
            message: 'Successfully generated QR code',
            err: {}
        });
    } catch (error) {
        console.log('Something went wrong in the controllers');
        throw error;
    }
}


// const sendMessage = async(req,res) =>{
//     try {
//         const response = whatsappServices.sendMessage(req.body);
//         return res.status(200).json({
//             data: response,
//             success: true,
//             message: 'Successfully generated QR code',
//             err: {}
//         });
//     } catch (error) {
//         console.log('Something went wrong in the controllers');
//         throw error;
//     }
// }

module.exports={
    generateQRCode
    // sendMessage
}