const nodeMailer = require('nodemailer');
// const ejs = require('ejs');
// const path = require('path');

let transporter = nodeMailer.createTransport({
    service : 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
    
});

// let renderTemplate = (data, relativePath)=>{
//     let mailHTML;
//     ejs.renderFile(
//         path.join(__dirname,'./mailingTemplates',relativePath),
//         data,
//         function(err,template){
//             if(err){console.log(`Error in rendering template`); return;}

//             mailHTML = template;
//         }
//     )

//     return mailHTML;
// }


module.exports = {
    transporter : transporter,
    // renderTemplate : renderTemplate
}