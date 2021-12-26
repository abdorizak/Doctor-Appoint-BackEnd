const { Category, validate } = require("../Model/Cagegory");
const { DoctorModel } = require("../Model/Doctor");
const express = require("express");
const router = express.Router();

router.get("/categors/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await DoctorModel.find({ categoryId: id }).populate({
      path: "categoryId",
      model: "Category",
      select: "-_id categoryName categoryImage",
    });

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

router.post("/create-Category", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  try {
    const doctoryCategory = new Category(req.body);
    const result = await doctoryCategory.save();
    res.send({
      status: 200,
      message: "Successfull",
      category: result,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});

router.put("/update-Category/:id", async (req, res) => {
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send({
      status: 200,
      message: "Successfull",
    });
  } catch (error) {
    res.send({
      status: 400,
      message: `Error: ${error}`,
    });
  }
});

router.delete("/delete-Category/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
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
