const axios = require('axios');
module.exports = async function (req, resp) {

    // let code = Buffer.from(req.body.code).toString('base64')
    try {
      let res = await axios
          .post(process.env.COMPILE_API, {
            source_code: Buffer.from(req.body.code).toString('base64'),
            stdin: Buffer.from(req.body.input).toString('base64'),
            "language_id":54
          },{
              headers:{
               "Content-type": "application/json"
          }})
          
        //   console.log(res.data);
          if(res.data.status.description=='Compilation Error'){
              let buff = Buffer.from(res.data['compile_output']??"", 'base64');
              let output = buff.toString('ascii');
              let atob = require("atob")
              res.data['stderr'] = atob(res.data['compile_output']);
              
              //   res.data['stderr'] = res.data['compile_output'];
              delete res.data.compile_output
          }
          else if(res.data.status.description=='Time Limit Exceeded'){
              res.data['stderr'] = "Time Limit Exceeded"
        }
        res.data['stdout']  = Buffer.from(res.data['stdout']??"",'base64').toString('ascii');
          resp.send(res.data);
    } catch (err) {
        console.log(err)
        if (err.response) 
            resp
                .status(err.response.status)
                .send(err.response.data)
        else resp.status(500).send("Server down..")
        }

}