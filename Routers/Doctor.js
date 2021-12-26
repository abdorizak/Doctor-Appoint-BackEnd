const { DoctorModel, validation } = require("../Model/Doctor");
const express = require("express");
const router = express.Router();

router.get("/doctors/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await DoctorModel.find({ categoryId: id });
    //   .populate({
    //   path: "categoryId",
    //   model: "Category",
    //   select: "-_id categoryName categoryImage",
    // });

    res.send({
      status: 200,
      message: "Successfull",
      Category: category,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});

router.get("/doctors", async (req, res) => {
  try {
    const allDoctors = await DoctorModel.find();
    res.send({
      status: 200,
      message: "SuccessFull",
      Doctors: allDoctors,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error ${error}`,
    });
  }
});

router.post("/create-Doctor", async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  try {
    const createDocotor = new DoctorModel(req.body);
    const result = await createDocotor.save();
    res.send({
      status: 200,
      message: "Successfull",
      Doctors: result,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error ${error}`,
    });
  }
});

router.get("/update-Doctor/:id", async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  try {
    const updateDoc = await DoctorModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send({
      status: 200,
      message: "Successfully Updated",
    });
  } catch (error) {
    res.send({
      status: 404,
      message: `Error: ${error}`,
    });
  }
});

router.delete("/delete-Doctor", async (req, res) => {});

module.exports = router;
