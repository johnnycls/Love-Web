const User = require("../models/user.model");

function isOverlapped(startDate1, endDate1, startDate2, endDate2) {
  return startDate1 <= endDate2 && endDate1 >= startDate2;
}

exports.getLoves = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    const loves = currentUser.loves.map((love) => {
      return User.findOne({ phone: love.phone }).then((lover) => {
        if (
          lover &&
          lover.loves.find(
            (loverLove) =>
              loverLove.phone === currentUser.phone &&
              isOverlapped(
                love.createDate,
                love.expiryDate,
                loverLove.createDate,
                loverLove.expiryDate
              )
          )
        ) {
          return {
            createDate: love.createDate,
            expiryDate: love.expiryDate,
            phone: love.phone,
            twoWay: true,
          };
        }
        return {
          createDate: love.createDate,
          expiryDate: love.expiryDate,
          phone: love.phone,
          twoWay: false,
        };
      });
    });

    Promise.all(loves).then((loves) => {
      return res.status(200).json({
        type: "success",
        message: "fetch current user",
        phone: currentUser.phone,
        loves,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.createLove = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const currentUser = res.locals.user;

    if (currentUser.phone === phone) {
      return res.status(400).json({
        type: "error",
        message: "self love is not supported",
      });
    }

    if (currentUser.loves.find((love) => love.expiryDate > Date.now())) {
      return res.status(400).json({
        type: "error",
        message: "cannot create entry before last entry expired",
      });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    currentUser.loves.push({ phone, expiryDate });
    const user = await currentUser.save();

    const loves = currentUser.loves.map((love) => {
      return User.findOne({ phone: love.phone }).then((lover) => {
        if (
          lover &&
          lover.loves.find(
            (loverLove) =>
              loverLove.phone === currentUser.phone &&
              isOverlapped(
                love.createDate,
                love.expiryDate,
                loverLove.createDate,
                loverLove.expiryDate
              )
          )
        ) {
          return {
            createDate: love.createDate,
            expiryDate: love.expiryDate,
            phone: love.phone,
            twoWay: true,
          };
        }
        return {
          createDate: love.createDate,
          expiryDate: love.expiryDate,
          phone: love.phone,
          twoWay: false,
        };
      });
    });

    Promise.all(loves).then((loves) => {
      return res.status(200).json({
        type: "success",
        message: "created love",
        phone: currentUser.phone,
        loves,
      });
    });
  } catch (error) {
    next(error);
  }
};
