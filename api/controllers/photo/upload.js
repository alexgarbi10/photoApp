/**
 * PhotoController -> upload action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function upload(req, res) {
  const photoId = req.param('id');

  req.file('image').upload({
    // don't allow the total upload size to exceed ~10MB
    maxBytes: 10000000,
    dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
    saveAs: photoId
  }, (err, uploadedFiles) => {
    if (err) {
      return res.serverError(err);
    }

    return res.json({
      message: uploadedFiles.length + ' file(s) uploaded successfully!'
    });
  });
};
