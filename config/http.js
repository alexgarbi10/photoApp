/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'requestLogger',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      //'favicon',
    ],

    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // Skipper: Middleware form multipart/form-data
    // Don't allow the total upload size to exceed ~5MB
    bodyParser: (function _configureBodyParser(){
      const skipper = require('skipper');
      const middlewareFn = skipper({ maxBytes: 5000000 });
      return middlewareFn;
    })(),

    // Custom request logger
    requestLogger: function(req, res, next) {
      console.log('User agent :: ', req.headers['user-agent']);
      console.log('Requested :: ', req.method, 'path'.blue,':: '+ req.url, 'ip'.blue ,':: '+req.ip);
      return next();
    }

  },

};
