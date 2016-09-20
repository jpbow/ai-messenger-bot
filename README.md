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
    
5. Commit all the code with Git then create a new Heroku instance and push the code to the cloud.

    ```
    git init
    git add .
    git commit -m 'Initial commit'
    heroku create
    git push heroku master
    ```

### Create the Facebook App and Page

To be able to message our bot from Facebook we will need both a Facebook Page and an App. Firstly create a page [here](https://www.facebook.com/pages/create/) or use an existing one.

1. Create a Facebook App [here](https://developers.facebook.com/apps/).

	![FB App creation screenshot](/demo/image_1.jpg)

2. Navigate to 'Add Products' -> 'Messenger' and add it as a product.

3. Select the page you created ealier and use it to generate a Page Access Token. Save this somewhere as we're going to need it later.

	![Page Access Token generation screenshot](/demo/image_2.png)

4. On the same page click on 'Setup Webhooks'. Fill in your Heroku URL (include the '/webhook' part too) and the token (the one shown is the default) and check the same subscription boxes as shown below.

	![Webhook setup screenshot](/demo/image_3.png)

5. Using the Page Access Token you saved earlier, go back to the Terminal and enter this command to trigger the Facebook App to send messages.

	```
	curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=<PAGE_ACCESS_TOKEN>"
	```

6. Finally, in the App menu, go to Settings -> Basic and get the App Secret and save it somewhere too, as we'll need it later.

### Setup wit.ai

1. Go to wit.ai and create a new app.

2. In the new app, create your first story. We're just going to start off with a simple story that says hello to the user when they message the bot. The server that we created on Heroku already has a function called getGreeting() which fetches the users name from Facebook and responds to messages with the message "Hi usersName! How can I help?". 

3. Get the users to clone my example bot??

4. Go to your bots Settings menu and go to the API Details section where you should find a Sever Access Token. Save this as we will need it later.

### Finish setting up the bot

Finally, we're now going to take those variables you saved earlier (the Page Access Token, App Secret and Server Access Token) and enter them into Heroku so it has permission to connect to Facebook and wit.ai. The best way to do this is to set each of the variables as config vars in Heroku (it keeps the app secrets out of version control).

1. In the Settings menu of your Heroku app you'll be able to enter in each of the three variables. Make sure to use the same naming as below.

	![Heroku config var setup screenshot](/demo/image_4.png)

All going well, you can now message your bot!

## Sources
* Makes use of code from the official wit.ai messenger.js example (https://github.com/wit-ai/node-wit)
* This guide loosely follows the 15 minute Facebook bot guide by (https://github.com/jw84/messenger-bot-tutorial)
