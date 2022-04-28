const axios = require('axios');
const btoa = require("btoa")
let atob = require("atob")

module.exports = async function (req, resp) {

    // let code = Buffer.from(req.body.code).toString('base64')
    try {
      let res = await axios
          .post(process.env.COMPILE_API,{
            "sourceCode": req.body.code,
            "filename": "main.cpp",
            "language": "cpp",
            "input": req.body.input,
            'compilerOptions':'-D_GLIBCXX_DEBUG -std=c++17 -O2 -Wall -Wextra -Wshadow -Wconversion -Wfloat-equal -Wduplicated-cond -Wlogical-op',
          },{
              headers:{
               "Content-type": "application/json"
          }})
          
        //   console.log(res.data);
        if(res.data['status']=='compile_error'){
            res.data['stderr']=res.data['message']
        }
        else if(res.data['status']=='time_limit_exceeded'){
            res.data['stderr']="Time Limit Exceeded"
        }  
        else if(res.data['status']=='runtime_error'){
          res.data['stderr']=res.data['stderr']

        }
        res.data['stdout']  = (res.data['stdout']);
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