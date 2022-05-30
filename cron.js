import fetch from "node-fetch";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const schedule = require('node-schedule');
let numTweets=0;//stores the total number of tweets that will be updated
let numUpdated=0;//stores the number of current updated tweets
let ok=false;//to control the requests 
await fetch('https://precariedappv2.herokuapp.com/get', {method:"GET"}).then(res => res.json()).then(res => numTweets=JSON.parse(res).length);//Sets the number of tweets this code will update


const job2 = schedule.scheduleJob('*/2 * * * *', async function(){//creates the cron that will send the requests to the API update funtion
  try{
    if(ok){
      await fetch('https://precariedappv2.herokuapp.com/update', {method:"GET"});//send the request
      numUpdated+=20;//update the variable with the number of updated tweets
      if(numUpdated>=numTweets){//if all tweets have been updated, sets the control variable to false and restart the number of updated tweets variable
        ok=false;
        numUpdated=0;
      }
    }
  }
  catch(error2){

  }
});


const job1 = schedule.scheduleJob(' 0 11 */2 * *',async function(){//creates the cron that will control the when all tweets start to being updated
    try{
      if(!ok){
        await fetch('https://precariedappv2.herokuapp.com/get', {method:"GET"}).then(res => res.json()).then(res => numTweets=JSON.parse(res).length);//Sets the number of tweets this code will update

        ok=true;//Change the control variable to allow the other cron to send the requests

      }  
    }
    catch(error1){
    }  
});
