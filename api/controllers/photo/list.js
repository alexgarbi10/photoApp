/**
 * PhotoController -> list action
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function list(req, res) {
  const list = await Photo.find({ sort: 'createdAt DESC' });
  return res.json({ list: list });
};
