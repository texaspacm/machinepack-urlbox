module.exports = {


  friendlyName: 'Get Url',


  description: 'Get\'s the URL from URLBOX.io to display the screen capture.',


  extendedDescription: '',


    inputs: {
      apiKey: {
        example: 'ODUfdisauPUdufsoUSF',
        description: 'Your URLBOX.io API key.',
        required: true
      },
      secret: {
        example: 'ODUfdisauPUdufsoUSF',
        description: 'Your URLBOX.io secret.',
        required: true
      },
      url: {
        example: 'http://www.apple.com',
        description: 'HTTP Encoded target url',
        required: true
      },
      width: {
        example: 1280,
        description: 'Viewport width of the browser.  Default 1280.',
        required: false
      },
      height: {
        example: 1024,
        description: 'Viewport of the height of the browser.  Default 1024.',
        required: false
      },
      thumb_width: {
        example: 200,
        description: 'Width of the generated thumbnail, leave off for full-size screen',
        required: false
      },
      user_agent: {
        example: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36',
        description: 'The user-agent string used to emulate a particular client',
        required: false
      },
      wrap: {
        example: true,
        description: 'Optionally place a screenshot inside an image of an iPhone or other device.',
        required: false
      },
      delay: {
        example: 1000,
        description: 'Amount of time to wait in milliseconds before urlbox takes the screen capture.',
        required: false
      },
      full_page: {
        example: true,
        description: 'specify whether to capture the full-length of the website.',
        required: true
      },
      force: {
        example: false,
        description: 'Take a fresh screenshot instead of getting a cached version.',
        required: false
      },


    },


    defaultExit: 'success',


    exits: {

      error: {
        description: 'Unexpected error occurred.',
      },

      success: {
        description: 'Done.',
      },

    },


    fn: function (inputs,exits) {

      var crypto = require('crypto');
      var util = require('util');

      var apiKey = inputs.apiKey;
      var apiSecret = inputs.secret;

      var encodedUrl = encodeURIComponent(inputs.url);
      var queryString = "url=" + encodedUrl;

      if(inputs.width){
        queryString += "&width=" + inputs.width;
      }
      if(inputs.height){
        queryString += "&height=" + inputs.height;
      }
      if(inputs.thumb_width){
        queryString += "&thumb_width=" + inputs.thumb_width;
      }
      if(inputs.user_agent){
        queryString += "&user_agent=" + inputs.user_agent;
      }
      if(inputs.wrap){
        queryString += "&wrap=" + inputs.wrap;
      }
      if(inputs.delay){
        queryString += "&delay=" + inputs.delay;
      }
      if(inputs.full_page){
        queryString += "&full_page=" + inputs.full_page;
      }
      if(inputs.force){
        queryString += "&force=" + inputs.force;
      }

      var token = crypto.createHmac("sha1", inputs.secret).update(queryString).digest("hex");

      var constructedUrl = util.format('https://api.urlbox.io/v1/%s/%s/png?%s', apiKey, token, queryString);

      return exits.success(constructedUrl);


    },



  };
