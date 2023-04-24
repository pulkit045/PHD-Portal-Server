const queue = require('./kue');

const newRequest = require('../mailers/mailingTemplates/supervisor_finalized');

queue.process('emailsfromfaculty',function(job,done){
    newRequest.newRequest(job.data);

    done();
});