'use strict'

function options(){
  const options={
    gzip:true,
    followRedirect:false,
    headers:{
      'User-Agent': 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  }
  return  options;
}


module.exports=options;
