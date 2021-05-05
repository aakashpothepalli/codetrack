'use strict'

var axios = require('axios');
const request = require('request').defaults({jar:true});
const options = require('./http_options');
const Promise = require('bluebird');
const cheerio = require('cheerio');



function toNumbers(d) {
  var e = [];
  d.replace(/(..)/g, function (d) {
      e.push(parseInt(d, 16))
  });
  return e
}
function toHex() {
  for (
      var d = [],
      d = 1 == arguments.length && arguments[0].constructor == Array
          ? arguments[0]
          : arguments,
      e = "",
      f = 0; f < d.length; f++
  ) 
      e += (
          16 > d[f]
          ? "0"
          : ""
          ) + d[f].toString(16);
          return e.toLowerCase()
        }
        var a = toNumbers("e9ee4b03c1d0822987185d27bca23378"),
        b = toNumbers("188fafdbe0f87ef0fc2810d5b3e34705"),
        c ;
        let slowAES = require('./slowaes')
        let RCPC;


async function getCookie(){
    let res = await axios('https://codeforces.com/enter')
    let htmlString = (res.data)

    let index = htmlString.indexOf("c=toNumbers(")
    console.log("index",index)
    c = htmlString.substr(index+13,32)
    console.log(c)
    RCPC = "RCPC=" + toHex(slowAES.decrypt(toNumbers(c), 2, a, b)) + "; expires=Thu" +
    ", 31-Dec-37 23:55:55 GMT; path=/";
    console.log(RCPC)
}
function get_tokens(){
  return new Promise(async function(resolve,reject){
    console.log("in get_tokens")

    await getCookie();

    var config = {
      method: 'get',
      url: 'https://codeforces.com/',
      headers: { 
        'authority': 'codeforces.com', 
        'pragma': 'no-cache', 
        'cache-control': 'no-cache', 
        'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"', 
        'sec-ch-ua-mobile': '?0', 
        'upgrade-insecure-requests': '1', 
        'dnt': '1', 
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36', 
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
        'sec-fetch-site': 'same-origin', 
        'sec-fetch-mode': 'navigate', 
        'sec-fetch-dest': 'document', 
        'referer': 'https://codeforces.com/enter?back=%2F&f0a28=1', 
        'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7', 
        // 'cookie': RCPC
      }
    };

    axios(config)
    .then(function (response) {
      let body = response.data;
      let $=cheerio.load(body);
      let csrf_token;
      $('meta').map(function(n,el){
        if($(el).attr('name')=='X-Csrf-Token'){
          csrf_token=$(el).attr('content');
          if(csrf_token==undefined){
            reject(new Error('csrf_token not found.'));
            return;
          }
          return resolve({csrf_token,RCPC});
        }

      });


    })
    .catch(function (error) {
      resolve(error);
      return;
    });


  //   let http_options=options();
  //   http_options.url='http://codeforces.com/enter';
  //   http_options.method='GET';

  //   request({'url':http_options.url,'method':http_options.method,header:{'cookie':RCPC}},function(err,res,body){
  //     if(err){
  //       resolve(err);
  //       return ;
  //     }
  //     // console.log(body)
     

  //   })

  })

}


module.exports=get_tokens;
