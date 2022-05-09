const nodemailer = require('nodemailer')

//? exportar funciones para enviar mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nachoburgos1995@gmail.com',
        pass: 'mtlsdatewtbcwhbf'
    }
});
