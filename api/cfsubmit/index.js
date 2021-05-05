'use strict'

const get_submission_token = require('./get_submission_token');
const get_tokens = require('./get_tokens');
const login = require('./login');
const submit = require('./submit');


module.exports = async function (req, resp) {
    if(!req.body.code || !req.body.handle || !req.body.pass || !req.body.problemID )
    {
      
      req.status(400).send("Some of the paramaters are missing")
      return;
    }
    else{
        console.log("started")
        // console.log(req.body)
        let res = await get_tokens()
        .then(login(req.body.handle,req.body.pass))
        .then(get_submission_token(req.body.problemID))
        .then(submit(req.body.code,req.body.problemID))
        .then((data)=>{
            // let url='wss://pubsub.codeforces.com/ws/'+data.uc+'/'+data.cc+'/'+data.pc+'?_=1472812847834&tag=&time=&eventid='

            console.log("submitted")
            resp.status(200).send("Submitted")
        }).catch((err)=>{
            resp.status(400).send("You have submitted the same code before")
            return err;
        })
        // console.log(res);
        // resp.send(res);
      
    }
}

