/**
 * PhotoController -> upload action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function upload(req, res) {
  // Get params
  const { name, description } = req.allParams();

  // S3 configuration params
  const { active, key, secret, bucket } = sails.config.s3;
  const skipperS3 = require('skipper-s3');

  // Configure Skipper
  var uploadConfig = {
    key: key,
    secret: secret,
    bucket: bucket
  };

  // If S3 is active use custom skipper adapter
  if (active) {
    uploadConfig.adapter = skipperS3;
  }

  // Parameter validations
  if (!name) {
    return res.badRequest(new Error('No photo name specified'));
  }

  if (!description) {
    return res.badRequest(new Error('No photo description specified'));
  }

  try {
    // New photo is added to db
    var photo = await Photo.create({
      name: name,
      description: description
    }).fetch();

    // Upload file using custom config
    req.file('attachment').upload(
      uploadConfig,
      async function handleFileUpload(err, uploadedFiles) {
        if (err) {
          return res.serverError(new Error('Photo could not be uploaded to the server'));
        }

        // Photo attrs to update
        var file = uploadedFiles[0];
        var updates = {
          imageFd: file.fd,
          imageType: file.type,
          imageSize: file.size
        };

        // Update photo in db
        var photos = await Photo.update({
          id: photo.id
        }, updates).fetch();

        // Validate at least one updated instance
        if (photos.length === 0) {
          return res.serverError(new Error('Photo could not be uploaded to the server'));
        }

        return res.status(200).json({
          photo: photos[0],
          message: photo.name + ' file uploaded successfully!',
        });
      }
    );
  } catch (error) {
    return res.serverError(error);
  }
};
