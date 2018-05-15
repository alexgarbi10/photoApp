/**
 * PhotoController -> fetch action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function fetch(req, res) {
  const photoId = req.param('id');

  if (!_.isNumeric(photoId)) {
    return res.badRequest(new Error('No photo ID specified!'));
  }

  var photo = await Photo.findOne({ id: photoId });
  return res.json({ photo: photo });
};
