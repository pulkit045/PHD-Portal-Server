const nodeMailer = require('../nodemailer');
const Scholar = require('../../database/models/scholar.model');

exports.newRequest = async (data) => {
    nodeMailer.transporter.sendMail({
        from: process.env.EMAIL,
        to : data.user.email,
        subject : `Supervisor Request result from ${data.request.supervisor}`,
        html : `<h2>Greetings ${data.user.fullName} your request has been ${data.request.supervisor_status} from ${data.request.supervisor}</h2>`
    },(err,info)=>{
        if(err){
            console.log('error' , err);
            return;
        }

        // console.log('messgae : )' , info);
        return;
    });
}


//to do

//mtech role do something with it 
//examcell
//mailing for supervisor confirmation as well as recieving new request from scholars
//some table related stuff : ) 