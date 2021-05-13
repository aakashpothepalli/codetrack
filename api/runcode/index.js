const axios = require('axios');
module.exports = async function (req, resp) {

    var axios = require('axios');
    var data = {"cmd":`g++ -std=c++14 -O2 -Wall -pedantic -pthread main.cpp && ./a.out << EOF \\n ${req.body.input}`,"src":(req.body.code)};
    // console.log(process.env.COMPILE_API)
    var config = {
    method: 'post',
    url: process.env.COMPILE_API,
    headers: { 
        'Connection': 'keep-alive', 
        'Pragma': 'no-cache', 
        'Cache-Control': 'no-cache', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36', 
        'DNT': '1', 
        'Content-Type': 'text/plain;charset=UTF-8', 
        'Accept': '*/*', 
        'Origin': 'http://coliru.stacked-crooked.com', 
        'Referer': 'http://coliru.stacked-crooked.com/', 
        'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7', 
    },
    data : JSON.stringify(data)
    };

    axios(config,{timeout:2})
    .then(function (response) {
        // console.log((response.data) );
        resp.send({
            stdout:(response.data).split("\n").slice(1).join("\n"),
            stderr:""
        })
    })
    .catch(function (error) {
    console.log(error);
    });

    // try {
    //   let res = await axios
    //       .post("https://glot.io/api/run/cpp/latest", {
    //           language: "cpp",
    //           source: req.body.code,
    //           stdin: req.body.input,
    //           args: [],
    //           files:[
    //               {
    //                   "name":"main.cpp",
    //                   "content":req.body.code
    //             }
    //           ],
    //           stdin:req.body.input
    //       },{
    //           headers:{
    //            "Authorization" :process.env.GLOT_API_KEY,
    //            "Content-type": "application/json"
    //       }})
    //       console.log(res.data);
    //       resp.send(res.data);
    // } catch (err) {
    //     if (err.response.status) 
    //         resp
    //             .status(429)
    //             .send("To many requests")
    //     }

}