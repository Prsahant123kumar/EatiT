const { Information: User } = require("../models/UserInformation");
const mongoose = require("mongoose");

const EnterPersonaldetails = async (req, res) => {
  try {
    const {
      fullname,
      Age,
      Gender,
      Height,
      Purpose,
      Allerggies,
      Dieases,
      Health_Goals,
      Dietary_Preference,
      Additional_Information,
    } = req.body;

    if (
      !fullname ||
      !Age ||
      !Gender ||
      !Height ||
      !Purpose ||
      !Dietary_Preference
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const authId = req.id || req.userId; // Assuming JWT middleware sets req.id

    const newUser = await User.create({
      fullname,
      Age,
      Gender,
      Height,
      Purpose,
      Allerggies,
      Dieases,
      Health_Goals,
      Dietary_Preference,
      Additional_Information,
      authId,
    });

    return res.status(201).json({
      success: true,
      user: newUser,
      message: "Personal details saved successfully",
    });
  } catch (error) {
    console.error("Error saving personal details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.id || req.userId;

    const {
      fullname,
      Age,
      Gender,
      Height,
      Purpose,
      Allerggies,
      Dieases,
      Health_Goals,
      Dietary_Preference,
      Additional_Information,
    } = req.body;

    const updatedData = {
      fullname,
      Age,
      Gender,
      Height,
      Purpose,
      Allerggies,
      Dieases,
      Health_Goals,
      Dietary_Preference,
      Additional_Information,
    };

    const updatedUser = await User.findOneAndUpdate(
      { authId: userId },
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  EnterPersonaldetails,
  updateProfile,
};
