# Facebook Messenger bot with wit.ai integration
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/42c2df2d04664433b100a82e81bca3f0)](https://www.codacy.com/app/jpbowley/ai-messenger-bot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jpbow/ai-messenger-bot&amp;utm_campaign=Badge_Grade)
[![dependencies Status](https://david-dm.org/jpbow/ai-messenger-bot/status.svg)](https://david-dm.org/jpbow/ai-messenger-bot)

Follow this tutorial to get the bot up and running in less than half an hour! I personally use this code as the basis for my personal Messenger bot projects (all in private respositories for now).

In this tutorial we deploy the NodeJS server directly to Heroku, but it can be run locally by using ngrok so the Facebook Messenger platform can reach you. Documentation on this will be available at a later time.

## You'll need the following before we begin
* [A wit.ai account](https://wit.ai/)
* [A Heroku account](https://www.heroku.com/)

## Quickstart

Note: The following steps only cover pushing the code to Heroku. Steps to integrate Wit.ai and Facebook Messenger coming over the next few days.

* Need to set up Facebook App and Page first
* Need to set config vars in Heroku before pushing

1. Install the Heroku toolbelt from here https://toolbelt.heroku.com to launch, stop and monitor instances. Sign up for free at https://www.heroku.com if you don't have an account yet.

2. Install Node from here https://nodejs.org, this will be the server environment. Then open up Terminal or Command Line Prompt and make sure you've got the very most recent version of npm by installing it again:

    ```
    sudo npm install npm -g
    ```
    
3. Clone this repository somewhere on your computer
   
    ```
    git clone https://github.com/jpbow/ai-messenger-bot.git
    ```
    
4. Install the npm dependencies as specified in package.json
   
    ```
    npm install
    ```
    
5. Commit all the code with Git then create a new Heroku instance and push the code to the cloud.

    ```
    git init
    git add .
    git commit --message 'Initial commit'
    heroku create
    git push heroku master
    ```
    
All going well, the server is now running on Heroku!

## Sources
* Makes use of code from the official wit.ai messenger.js example (https://github.com/wit-ai/node-wit)
* This guide loosely follows the 15 minute Facebook bot guide by (https://github.com/jw84/messenger-bot-tutorial)
