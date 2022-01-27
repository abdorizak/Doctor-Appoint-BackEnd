const { FavoriteModel, validation } = require("../Model/Favorites.Model");
const Auth = require("../Middleware/Auth");
const express = require("express");
const router = express.Router();

router.use(Auth);

router.get("/favorites/:id", async (req, res) => {
  try {
    const favorite = await FavoriteModel.find({
      userID: req.params.id,
    }).populate({
      path: "doctorID",
      model: "DoctorModel",
    });
    res.send({
      status: 200,
      favorited: favorite,
    });
  } catch (err) {
    res.send({
      status: 404,
      message: `Error: ${err}`,
    });
  }
});

router.post("/create-Favorites", async (req, res) => {
  const { error } = validation(req.body);
  if (error)
    return res.status(400).send({ message: `${error.details[0].message}` });
  try {
    const doctorid = await FavoriteModel.findOne({
      doctorID: req.body.doctorID,
    });
    if (doctorid) {
      res.send({
        status: 406,
        message: `Doctor is already In Favorites 😇`,
      });
    } else {
      const favorited = await FavoriteModel({
        userID: req.body.userID,
        doctorID: req.body.doctorID,
      });
      await favorited.save();
      res.send({
        status: 200,
        message: `You have successfull favorite this Doctor 🎉`,
      });
    }
  } catch (error) {
    res.send({
      status: 404,
      message: `Error: ${error}`,
    });
  }
});

router.delete("/delete-Favorites/:id", async (req, res) => {
  try {
    const deleteFavorite = await FavoriteModel.findByIdAndDelete(req.params.id);
    res.send({
      status: 200,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});

module.exports = router;
