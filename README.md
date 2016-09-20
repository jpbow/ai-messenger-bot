# Facebook Messenger bot with wit.ai integration
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/42c2df2d04664433b100a82e81bca3f0)](https://www.codacy.com/app/jpbowley/ai-messenger-bot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jpbow/ai-messenger-bot&amp;utm_campaign=Badge_Grade)
[![dependencies Status](https://david-dm.org/jpbow/ai-messenger-bot/status.svg)](https://david-dm.org/jpbow/ai-messenger-bot)

Follow this tutorial to get the bot up and running in less than half an hour! I personally use this code as the basis for my personal Messenger bot projects (all in private respositories for now).

In this tutorial we deploy the NodeJS server directly to Heroku, but it can be run locally by using ngrok so the Facebook Messenger platform can reach you. Documentation on this will be available at a later time.

## You'll need the following before we begin
* [A wit.ai account](https://wit.ai/)
* [A Heroku account](https://www.heroku.com/)

## Quickstart

### Launch the server

Note: The following steps only cover pushing the code to Heroku. Steps to integrate Wit.ai and Facebook Messenger coming over the next few days.

1. Install the Heroku toolbelt from here https://toolbelt.heroku.com to launch, stop and monitor instances. Sign up for free at https://www.heroku.com if you don't have an account yet.

2. Install Node from here https://nodejs.org, this will be the server environment. Then open up Terminal or Command Line Prompt and make sure you've got the very most recent version of npm by installing it again:

    ```
    sudo npm install npm -g
    ```
    
3. Download the .zip file containing all of the files in this repository and extract them to a folder on your computer.
    
4. Navigate to that folder in the terminal and install the npm dependencies (which are listed in package.json).
   
    ```
    npm install
    ```
    
5. Commit all the code with Git then create a new Heroku instance.

    ```
    git init
    git add .
    git commit -m 'Initial commit'
    heroku create
    git push heroku master
    ```
6. Go to the Heroku website and from the Dashboard click on your app's name. In the Settings menu you'll be able to set the Config          Variables. There are three that you need enter: FB_APP_SECRET, FB_PAGE_TOKEN and WIT_TOKEN.
    
7.  Now that we've set our Config Variables we can push the code to the cloud.

    ```
    git push heroku master
    ```

### Create the Facebook App and Page

To be able to message our bot from Facebook we will need both a Facebook Page and an App. Firstly create a page [here](https://www.facebook.com/pages/create/) or use an existing one.

1. Now go [here](https://developers.facebook.com/apps/) and create a Facebook App.

2. Then go to 'Add Products' -> 'Messenger' and add it as a product.

3. Select the page you created ealier and use it to generate a Page Access Token. Save this somewhere as we're going to need it later.

4. On the same page click on 'Setup Webhooks'. Fill in your Heroku URL (include the '/webhook' part too) and the token (the one shown is the default) and check the same subscription boxes as shown below.

5. Now using the Page Access Token you saved earlier, go back to the Terminal and enter this command to trigger the Facebook App to send messages.

	```
	curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=<PAGE_ACCESS_TOKEN>"
	```

6. Finally, in the App menu, go to Settings -> Basic and get the App Secret and save it somewhere too, as we'll need it later.

### Setup wit.ai

1. Go to wit.ai and create a new app.

2. In the new app, create your first story. We're just going to start off with a simple story that says hello to the user when they message the bot. The server that we created on Heroku already has a function called getGreeting() which fetches the users name from Facebook and responds to messages with the message "Hi usersName! How can I help?". 

3. Get the users to clone my example bot??

4. Now go to your bots Settings menu and go to the API Details section where you should find a Sever Access Token. Save this as we will need it later.

### Finish setting up the bot

Finally, we're now going to take those variables you saved earlier (the Page Access Token and App Secret) and enter them into Heroku so it can connect to Facebook. The best way to do this is to set each of the variables as config vars in Heroku (keeps the app secrets out of version control).

1. Go to your Heroku app and go to the Settings menu. Here you can add each of the variables in. Use the same naming as below.

    
All going well, the server is now running on Heroku!

## Sources
* Makes use of code from the official wit.ai messenger.js example (https://github.com/wit-ai/node-wit)
* This guide loosely follows the 15 minute Facebook bot guide by (https://github.com/jw84/messenger-bot-tutorial)
