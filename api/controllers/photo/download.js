/**
 * PhotoController -> download action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function fetch(req, res) {
  const SkipperDisk = require('skipper-disk');
  const fileAdapter = SkipperDisk(/* optional opts */);
  const photoId = req.param('id');

  if (!_.isNumeric(photoId)) {
    return res.badRequest(new Error('No photo ID specified!'));
  }

  var photo = await Photo.findOne({ id: photoId });

  res.set('Content-disposition', 'attachment; filename=\"' + file.name + '\"');

  fileAdapter.read(photo.imageFd)
  .on('error', (err) => {
    return res.serverError(err);
  })
  .pipe(res);
};
