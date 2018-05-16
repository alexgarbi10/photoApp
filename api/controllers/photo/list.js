/**
 * PhotoController -> list action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function list(req, res) {
  try {
    const list = await Photo.find({ sort: 'createdAt DESC' });
    return res.json(response);
  } catch (error) {
    const message = error.message || 'Unexpected error';
    return res.serverError(message);
  }
};
