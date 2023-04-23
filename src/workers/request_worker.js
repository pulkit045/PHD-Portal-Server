const queue = require('./kue');

const newRequest = require('../mailers/mailingTemplates/request');

queue.process('emails',function(job,done){
    newRequest.newRequest(job.data);

    done();
});