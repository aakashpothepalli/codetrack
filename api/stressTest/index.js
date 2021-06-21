const axios = require('axios');
const btoa = require("btoa")
let atob = require("atob")
var gen = require('random-seed'); 

module.exports = async function (req, resp) {
    console.log(req.body)
    let {myConfig,type,seed,hasTestCases} = req.body
    let test="";
    if(hasTestCases===true){
        test = "1\n"
    }

    if(type==='1darray'){
        let {n,rangeNL,rangeNR} = myConfig;
        let rand = gen(seed)
        let ar = Array.from({length: n}, (v, k) => k+1); 
        for(let i in ar){
            ar[i] = rand.intBetween(rangeNL,rangeNR);
        }
        // console.log(ar)
        test+=n+'\n'
        for(let el of ar){
            test = test + " " + el;
        }
        console.log(test)
    }
    resp.send([test])
}