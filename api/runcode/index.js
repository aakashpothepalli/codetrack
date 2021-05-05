const axios = require('axios');
module.exports = async function (req, resp) {

    try {
      let res = await axios
          .post("https://glot.io/api/run/cpp/latest", {
              language: "cpp",
              source: req.body.code,
              stdin: req.body.input,
              args: [],
              files:[
                  {
                      "name":"main.cpp",
                      "content":req.body.code
                }
              ],
              stdin:req.body.input
          },{
              headers:{
               "Authorization" :process.env.GLOT_API_KEY,
               "Content-type": "application/json"
          }})
          console.log(res.data);
          resp.send(res.data);
    } catch (err) {
        if (err.response.status) 
            resp
                .status(429)
                .send("To many requests")
        }

}