const axios = require('axios');
const btoa = require("btoa")
let atob = require("atob")

module.exports = async function (req, resp) {

    // let code = Buffer.from(req.body.code).toString('base64')
    try {
      let res = await axios
          .post(process.env.COMPILE_API, {
            source_code: btoa(req.body.code),
            stdin:btoa(req.body.input),
            "language_id":54
          },{
              headers:{
               "Content-type": "application/json"
          }})
          
        //   console.log(res.data);
          if(res.data.status.description=='Compilation Error'){
              // let buff = Buffer.from(res.data['compile_output']??"", 'base64');
              // let output = buff.toString('ascii');
              res.data['stderr'] = decodeURIComponent(escape(atob(res.data['compile_output'])));
              console.log("compile error",res.data['stderr'])
              
              //   res.data['stderr'] = res.data['compile_output'];
              delete res.data.compile_output
          }
          else if(res.data.status.description=='Time Limit Exceeded'){
              res.data['stderr'] = "Time Limit Exceeded"
        }
        res.data['stdout']  = atob(res.data['stdout']??"",'base64');
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