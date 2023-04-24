const queue = require('./kue');

const newRequest = require('../mailers/mailingTemplates/requestsupervisor');

queue.process('emailstofaculty',function(job,done){
    newRequest.newRequest(job.data);

    done();
});