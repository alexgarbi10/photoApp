/**
 * PhotoController -> upload action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function upload(req, res) {
  const { name, description } = req.allParams();

  console.log('Data', name);
  console.log('description', description);

  // Parameter validations
  if (!name) {
    return res.badRequest('Please insert a name for the photo');
  }

  if (!description) {
    return res.badRequest('Please insert a description for the photo');
  }

  // Get the base URL from config
  var baseUrl = sails.config.baseUrl;

  try {
    // New photo is added to db
    const photo = await Photo.create({
      name: name,
      description: description
    });

    console.log('New photo', photo);

    req.file('attachment').upload({
      maxBytes: 5000000, // don't allow the total upload size to exceed ~5MB
      saveAs: photo.id
    }, (err, uploadedFiles) => {
      if (err) {
        return res.serverError(err.message || err.stack);
      }

      console.log(uploadedFiles);

      // Photo attrs to update
      const file = uploadedFiles[0];
      const updates = {
        imageFd: file.fd,
        size: file.size,
        type: file.type
      };

      // Photo is updated in db
      Photo.update({
        id: photo.id
      }, updates);

      console.log('photos', photos);

      return res.status(200).json({
        photo: photos,
        message: photo.name + ' file uploaded successfully!',
      });
    });
  } catch (error) {
    const data = { message: error.message || 'Internal server error' };
    return res.serverError(data);
  }
};
