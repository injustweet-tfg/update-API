import fetch from "node-fetch";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const schedule = require('node-schedule');
let numTweets=0;
let numUpdated=0;
let ok=true;
await fetch('https://precariedappv2.herokuapp.com/get', {method:"GET"}).then(res => res.json()).then(res => numTweets=JSON.parse(res).length);


const job2 = schedule.scheduleJob('*/2 * * * *', async function(){
  try{
    if(ok){
      await fetch('https://precariedappv2.herokuapp.com/update', {method:"GET"});  
      numUpdated+=20;
      if(numUpdated>=numTweets){
        ok=false;
        numUpdated=0;
      }
    }
  }
  catch(error2){

  }
});


const job1 = schedule.scheduleJob(' 0 11 */2 * *',async function(){
    try{
    if(!ok){
      await fetch('https://precariedappv2.herokuapp.com/get', {method:"GET"}).then(res => res.json()).then(res => numTweets=JSON.parse(res).length);

      console.log(numTweets)
      ok=true;
    
    }  
    }
    catch(error1){
    }  
});
