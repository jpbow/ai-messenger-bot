'use strict';

// Wit.ai parameters
const WIT_TOKEN = process.env.WIT_TOKEN;
if (!WIT_TOKEN) { throw new Error('missing WIT_TOKEN') };

// Messenger API parameters
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') };
const FB_APP_SECRET = process.env.FB_APP_SECRET;
if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') };

let FB_VERIFY_TOKEN = 'my_voice_is_my_password_verify_me';

module.exports = {
  WIT_TOKEN,
  FB_PAGE_TOKEN,
  FB_APP_SECRET,
  FB_VERIFY_TOKEN
};