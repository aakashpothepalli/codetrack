'use strict'

const request = require('request').defaults({jar:true});
const options = require('./http_options');
const Promise = require('bluebird');
const cheerio = require('cheerio');
function get_submission_token(problemId){
  return function(){
    console.log("in get submission token")
    return new Promise(function(resolve,reject){

      let http_options=options();

      http_options.url=`http://codeforces.com/contest/${problemId.substring(0,problemId.length-1)}/problem/${problemId[problemId.length-1]}`;
      http_options.method='GET';
      console.log(http_options.url)
      request({url:http_options.url,method:'GET'},function(err,res,body){
        let $=cheerio.load(body);
        if(err){
          return reject(err);
        }
        console.log(res.statusCode)
        if(res.statusCode!='200'){
          return reject(new Error('problemset not found.'))
        }

        let csrf_token,uc,cc,pc;
        $('meta').map(function(n,el){
          if($(el).attr('name')=='uc'){
            uc=$(el).attr('content');
          }
          if($(el).attr('name')=='cc'){
            cc=$(el).attr('content');
          }
          if($(el).attr('name')=='pc'){
            pc=$(el).attr('content');
          }
          if($(el).attr('name')=='X-Csrf-Token'){
            csrf_token=$(el).attr('content');
            if(csrf_token==undefined){
              return reject(new Error('csrf_token not found.'));

            }


          }

        });

        resolve({csrf_token:csrf_token,uc:uc,cc:cc,pc:pc});





      })



    });
  }


}

module.exports=get_submission_token;
