/**
 * PhotoController -> download action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function fetch(req, res) {
  const uploadConfig = {
    // adapter: require('skipper-s3'), // Skipper custom adapter
    // key: 'S3 Key', // S3 Key
    // secret: 'S3 Secret', // S3 Secret
    // bucket: 'Bucket Name' // S3 bucket name
    maxBytes: 5000000, // Don't allow the total upload size to exceed ~5MB
  };
  const SkipperDisk = require('skipper-disk');
  const fileAdapter = SkipperDisk(uploadConfig);
  const id = req.param('id');

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
