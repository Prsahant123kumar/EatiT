const User = require("../models/UserInformation");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const EnterPersonaldetails = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      heightCm,
      weightKg,
      purposes = [],
      allergies = ["None"],
      diseases = ["None"],
      otherDisease,
      healthGoal,
      dietPreference,
    } = req.body;
    const imageLocalPath = req.file?.path;
    console.log("Request file: ",req.file)
    console.log("Request.body: ",req.body)
    // Create an array to collect missing fields
    const missingFields = [];
    
    // Check each required field
    if (!fullName) missingFields.push("Full Name");
    if (!dateOfBirth) missingFields.push("Date of Birth");
    if (!gender) missingFields.push("Gender");
    if (!heightCm) missingFields.push("Height");
    if (!weightKg) missingFields.push("Weight");
    if (!healthGoal) missingFields.push("Health Goal");
    if (!dietPreference) missingFields.push("Diet Preference");
    let imageData = null;
    
    if (imageLocalPath) {
      const uploadedImage = await uploadOnCloudinary(imageLocalPath);
      if (uploadedImage) {
        imageData = {
          url: uploadedImage.secure_url,
          publicId: uploadedImage.public_id
        };
      }
    }
    console.log(imageData)
    // If any required fields are missing, return error with specific details
    if (missingFields.length > 0) {
      return res.status(200).json({
        success: false,
        message: "Missing required fields",
        missingFields: missingFields
      });
    }
    
    // Continue with the rest of your function...

    const authId = req.user;
    if (!authId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing auth ID",
      });
    }
    const PersonalData={
      fullName,
      dateOfBirth,
      gender,
      heightCm,
      weightKg,
      purposes,
      allergies,
      diseases,
      otherDisease,
      healthGoal,
      dietPreference,
      authId,
    }
    if(imageData) PersonalData.image=imageData;
    const newUser = await User.create(PersonalData);

    return res.status(201).json({
      success: true,
      user: newUser,
      message: "Personal details saved successfully",
    });
  } catch (error) {
    console.error("Error saving personal details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.id || req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing auth ID",
      });
    }

    const {
      fullName,
      dateOfBirth,
      gender,
      heightCm,
      weightKg,
      purposes,
      allergies,
      diseases,
      otherDisease,
      healthGoal,
      dietPreference,
      additionalInfo,
    } = req.body;

    const updatedData = {
      ...(fullName && { fullName }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(gender && { gender }),
      ...(heightCm && { heightCm }),
      ...(weightKg && { weightKg }),
      ...(purposes && { purposes }),
      ...(allergies && { allergies }),
      ...(diseases && { diseases }),
      ...(otherDisease && { otherDisease }),
      ...(healthGoal && { healthGoal }),
      ...(dietPreference && { dietPreference }),
      ...(additionalInfo && { additionalInfo }),
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
    console.error("Profile Update Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const FetchDetails = async (req, res) => {
  try {
    const userId = req.id || req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing auth ID",
      });
    }

    const userProfile = await User.findOne({ authId: userId });

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: userProfile,
      message: "Profile fetched successfully",
    });
  } catch (error) {
    console.error("Fetch Profile Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  EnterPersonaldetails,
  updateProfile,FetchDetails
};
