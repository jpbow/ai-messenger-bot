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
<!---
* Need to set up Facebook App and Page first
* Change the order of the steps so that the Heroku instance is created earlier so we can just copy and paste some of the config vars straight from Facebook when we create the app and page.
-->

1. Install the Heroku toolbelt from here https://toolbelt.heroku.com to launch, stop and monitor instances. Sign up for free at https://www.heroku.com if you don't have an account yet.

2. Install Node from here https://nodejs.org, this will be the server environment. Then open up Terminal or Command Line Prompt and make sure you've got the very most recent version of npm by installing it again:

    ```
    sudo npm install npm -g
    ```
    
3. Download the .zip file containing all of the files in this repository and extract them to a folder on your computer.
    
4. Navigate to that folder in the terminal and install the npm dependencies as specified in package.json
   
    ```
    npm install
    ```
    
5. Commit all the code with Git then create a new Heroku instance.

    ```
    git init
    git add .
    git commit --message 'Initial commit'
    heroku create
    ```
6. Go to the Heroku website and from the Dashboard click on your app's name. In the Settings menu you'll be able to set the Config          Variables. There are three that you need enter: FB_APP_SECRET, FB_PAGE_TOKEN and WIT_TOKEN.
   <!---Need to add where these come from.-->
    
7.  Now that we've set our Config Variables we can push the code to the cloud.

    ```
    git push heroku master
    ```
    
All going well, the server is now running on Heroku!

## Sources
* Makes use of code from the official wit.ai messenger.js example (https://github.com/wit-ai/node-wit)
* This guide loosely follows the 15 minute Facebook bot guide by (https://github.com/jw84/messenger-bot-tutorial)
