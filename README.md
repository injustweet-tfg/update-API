# update-API
This repository contains the code for update the tweets stored in IPFS.
### CODE


- [Cron:](https://github.com/injustweet-tfg/update-API/cron.js)         Javascript file with 2 cron jobs. One of them, sends GET requests to the "upload" API method in order to update all the tweets. The other job controls the first one by not sending more request than needed.
