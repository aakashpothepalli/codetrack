'use strict'

const request = require('request').defaults({jar:true});
const options = require('./http_options');
const Promise = require('bluebird');
const cheerio = require('cheerio');


function login(username,password){
  
  return function({csrf_token}){
    console.log("in login");
    return new Promise(function(resolve,reject){

        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
          'csrf_token': csrf_token,
          'action': 'enter',
          // 'ftaa': '22351cg4d0q3xospxq',
          'bfaa': 'eae6d19f450b38fb7ad2442d775d06b7',
          'handleOrEmail': username,
          'password': password,
          '_tta': '77' 
        });
        var config = {
          method: 'post',
          url: 'https://codeforces.com/enter?back=%2F',
          headers: { 
            'authority': 'codeforces.com', 
            'pragma': 'no-cache', 
            'cache-control': 'no-cache', 
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', 
            'sec-ch-ua-mobile': '?0', 
            'origin': 'https://codeforces.com', 
            'upgrade-insecure-requests': '1', 
            'dnt': '1', 
            'content-type': 'application/x-www-form-urlencoded', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
            'sec-fetch-site': 'same-origin', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-user': '?1', 
            'sec-fetch-dest': 'document', 
            'referer': 'https://codeforces.com/enter?back=%2F', 
            'accept-language': 'en-IN,en;q=0.9', 
            'cookie': 'JSESSIONID=FF19845EDEA2222A276BCAD489274FD8-n1; 39ce7=CFACuTa8; __utma=71512449.861688583.1618596958.1618596958.1618596958.1; __utmc=71512449; __utmz=71512449.1618596958.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1; __utmb=71512449.2.10.1618596958; evercookie_png=22351cg4d0q3xospxq; evercookie_etag=22351cg4d0q3xospxq; evercookie_cache=22351cg4d0q3xospxq; 70a7c28f3de=22351cg4d0q3xospxq; 39ce7=CFKj6DWt'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

        console.log(res.statusCode);
        console.log(body)
        if(res.statusCode=='200'){

          return reject(new Error('wrong handle or password.'))
        }
        // console.log("logged in")
        resolve('lool');
      // });
    })
  }

}


module.exports=login;
