var express = require("express");
const { authenticateToken } = require("../jwt");
var router = express.Router();

const {
  models: { User, Tag },
} = require("../models");

/* GET all experts. */

router.get("/me", authenticateToken, async (req, res) => {
  // const { password, ...resUser } = req.user.toObject();
  resUser = req.user.toObject();
  delete resUser.password;
  res.send(resUser);
});

router.put("/me", authenticateToken, async (req, res) => {
  if (req.body.expertDetails) {
    const myTags = req.body.expertDetails.inquiryTags;
    let tagsList = await Tag.find({}).exec();
    tagsList = tagsList.map(({ name }) => name);
    for (let i = 0; i < myTags.length; i++) {
      if (tagsList.indexOf(myTags[i]) === -1) {
        res.status(403).send(myTags[i] + " is invalid tag");
        return;
      }
    }
  }
  const { _id } = req.user;
  const updatedUser = await User.findOneAndUpdate({ _id }, req.body, {
    omitUndefined: true,
    runValidators: true,
    new: true,
  }).exec();
  // const { password, ...resUser } = updatedUser.toObject();
  resUser = updatedUser.toObject();

  delete resUser.password;

  res.send(resUser);
});
module.exports = router;
