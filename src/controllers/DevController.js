const axios = require("axios");

const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },

  async update(request, response) {
    const { latitude, longitude, techs } = request.body;
    const { _id } = request.params;

    const techsArray = parseStringAsArray(techs);
    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    await Dev.findByIdAndUpdate(
      { _id },
      {
        techs: techsArray,
        location
      },
      { returnOriginal: false },
      (err, doc) => {
        if (err) {
          return response.json({ message: "user already not exist" });
        }
        return response.json(doc);
      }
    );
  },

  async delete(request, response) {
    const { _id } = request.params;

    await Dev.findByIdAndDelete({ _id }, (err, res) => {
      if (!err) {
        return response.json({ message: "user already not exist" });
      }
      return response.json({ message: "user deleted" });
    });
  }
};
