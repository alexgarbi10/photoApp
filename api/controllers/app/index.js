/**
 * AppController -> index action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function index(req, res) {
  return res.view('pages/homepage');
};
