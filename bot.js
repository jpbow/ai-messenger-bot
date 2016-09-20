'use strict';

const Wit = require('./lib/wit.js').Wit;
const log = require('./lib/log.js');
const FB = require('./facebook.js');
const config = require('./const.js');
const fetch = require('node-fetch');

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach((k) => {
    if (sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid, context: {}};
  }
  return sessionId;
};

// Extracts first entity value with the name 'entity'
// from the list of entities
const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

// Our bot actions
const actions = {
  send({sessionId}, {text}) {
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      return FB.fbMessage(recipientId, text)
      .then(() => null)
      .catch((err) => {
        console.error(
          'Oops! An error occurred while forwarding the response to',
          recipientId,
          ':',
          err.stack || err
        );
      });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve();
    }
  },
  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart

  // Get the greeting for the user
  getGreeting({sessionId, context, entities}) {
    return new Promise(function(resolve, reject) {
      // Here should go the api call, e.g.:
      // context.forecast = apiCall(context.loc)
      // Get the users name based on their id
      const qs = 'access_token=' + encodeURIComponent(config.FB_PAGE_TOKEN);
      return fetch('https://graph.facebook.com/v2.6/' + sessions[sessionId].fbid + '?fields=first_name&' + qs, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .then(rsp => rsp.json())
      .then(json => {
        // Catch any error in retrieving the name
        if (json.error && json.error.message) {
          throw new Error(json.error.message);
        }

        // Add name to greeting if we could find it
        if (json.first_name) {
          context.greeting =  'Hi ' + json.first_name + '! How can I help you today?';
        } else {
          context.greeting =  'Hey there! How can I help you today?';
        }

        return resolve(context);
      });
    });
  },
};

const getWit = () => {
  return new Wit({
    accessToken: config.WIT_TOKEN, 
    actions,
    logger: new log.Logger(log.INFO)
  });
};

exports.getWit = getWit;

module.exports = {
  getWit,
  sessions,
  findOrCreateSession,
  firstEntityValue,
  actions
};