'use strict';

const request = require('request');
const crypto = require('crypto');
const fetch = require('node-fetch');
const config = require('./const.js');

// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference

const fbMessage = (id, text) => {
  const body = JSON.stringify({
    recipient: { id },
    message: { text },
  });
  const qs = 'access_token=' + encodeURIComponent(config.FB_PAGE_TOKEN);
  return fetch('https://graph.facebook.com/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then((rsp) => rsp.json())
  .then((json) => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};

// Enable typing icon
const fbSetTypingIndicator = (id) => {
  const body = JSON.stringify({
    recipient: { id },
    sender_action: "typing_on"
  });
  const qs = 'access_token=' + encodeURIComponent(config.FB_PAGE_TOKEN);
  return fetch('https://graph.facebook.com/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};

const fbQuickReplyMessage = (id, text, quickReplies) => {
  const body = JSON.stringify({
    recipient: { id },
    message: { 
      text,
      quickReplies
    }
  });
  const qs = 'access_token=' + encodeURIComponent(config.FB_PAGE_TOKEN);
  return fetch('https://graph.facebook.com/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then((rsp) => rsp.json())
  .then((json) => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};


/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers['x-hub-signature'];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    console.error('Couldn\'t validate the signature.');
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', config.FB_APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash !== expectedHash) {
      throw new Error('Couldn\'t validate the request signature.');
    }
  }
}

module.exports = {
  fbMessage,
  fbSetTypingIndicator,
  fbQuickReplyMessage,
  verifyRequestSignature
};