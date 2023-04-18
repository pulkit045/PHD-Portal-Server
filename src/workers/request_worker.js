const queue = require('./kue');

const newRequest = require('../mailers/mailingTemplates/request');

queue.process('emails',function(job,done){
    // console.log(job);
    // console.log(`emails worker is processign a job ${job.data}`);
    newRequest.newRequest(job.data);

    done();
});