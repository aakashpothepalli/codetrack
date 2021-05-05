'use strict'

const request = require('request').defaults({jar:true});
const options = require('./http_options');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');



function submit(code,problemId){

  return function(data){
    
    console.log("in submit");
    return new Promise(function(resolve,reject){

      let problem=problemId.substring(0,problemId.length-1);
      let problemIndex=problemId[problemId.length-1];
      if(!isNaN(problemIndex)){
        problem = id.substr(0,problemId.length-2);
        problemIndex = id.slice(-2)
        // console.log(problem,problemIndex)
      }
      let http_options=options();
      http_options.method='POST';
      http_options.url=`http://codeforces.com/contest/${problem}/problem/`+problemIndex+'?csrf_token='+data.csrf_token;


      let formData = {
        csrf_token:data.csrf_token,
        action:'submitSolutionFormSubmitted',
        submittedProblemIndex:problemIndex,
        source:code,
        programTypeId:'42',


      }
      http_options.formData=formData;

      console.log('before submit request')
      request(http_options,function(err,res,body){
        console.log("in submit request")
        if(err){
          return reject(err);
        }
        console.log(res.statusCode);

        if(res.statusCode!='302'){
          return reject(new Error('You have submitted exactly the same code before'));

        }

        // let $=cheerio.load(body);


        resolve(data);
      })


    })
  }
}





module.exports=submit;
