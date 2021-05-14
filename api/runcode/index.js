const axios = require('axios');
module.exports = async function (req, resp) {


    try {
      let res = await axios
          .post(process.env.COMPILE_API, {
              code: req.body.code,
              input: req.body.input,
          },{
              headers:{
               "Content-type": "application/json"
          }})
          console.log(res.data);
          resp.send(res.data);
    } catch (err) {
        if (err.response.status) 
            resp
                .status(err.response.status)
                .send(err.response.data)
        }

}