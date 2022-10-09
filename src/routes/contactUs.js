const ContactUs = require("../models/ContactUs");
// const {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// } = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const contactUs = new ContactUs(req.body);
  console.log(req.body)
  try {
    const savedContact = await contactUs.save();
    res.status(200).json(savedContact);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


module.exports = router;