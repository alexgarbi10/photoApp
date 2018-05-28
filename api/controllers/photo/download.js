/**
 * PhotoController -> download action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function fetch(req, res) {
  // Get params
  const id = req.param('id');

  // S3 configuration params
  const { active, key, secret, bucket } = sails.config.s3;
  const skipperDisk = require('skipper-disk');
  const skipperS3 = require('skipper-s3');

  // Configure Skipper
  var uploadConfig = {
    key: key,
    secret: secret,
    bucket: bucket
  };

  const fileAdapter = active ? skipperS3(uploadConfig) : skipperDisk(uploadConfig);

  // Parameter validations
  if (!id) {
    return res.badRequest(new Error('No photo ID specified'));
  }

  try {
    // Search photo by id
    var photo = await Photo.findOne({ id: id });

    // Set http custom header for download
    res.set('Content-disposition', 'attachment; filename=\"' + photo.name + '\"');
    res.set('Content-type', photo.imageType);

    // Stream the file down
    fileAdapter.read(photo.imageFd)
    .on('error', (err) => {
      return res.serverError(err);
    })
    .pipe(res);
  } catch (error) {
    return res.serverError(error);
  }
};
