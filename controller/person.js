require("dotenv").config();
const Person = require("../models/Person");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// Function to generate OTP (you'll need to implement this)
function generateOTP() {
  // Generate and return an OTP
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
}

// Function to send OTP to mobile number (you'll need to implement this)
async function sendOTP(mobileNumber, otp) {
  // Send OTP to the provided mobile number
  await client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: "+1 251 564 0502",
      to: `${mobileNumber}`,
    })
    .then((message) => console.log(message))
    .catch((error) => {
      console.log(error);
    });
}

const createPerson = async (req, res) => {
  try {
    // Validate the incoming data
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      address,
      city,
      state,
      pincode,
      school,
      Class,
      boards,
      subjectYouStudy,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !mobileNumber ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !school ||
      !Class ||
      !boards ||
      !subjectYouStudy
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate OTP (this is just a placeholder, you'll need to implement your OTP generation logic)
    const otp = generateOTP();

    // Save the user details and OTP in temporary storage (e.g., session)
    req.session.userDetails = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      address,
      city,
      state,
      pincode,
      school,
      Class,
      boards,
      subjectYouStudy,
      otp,
    };

    // Send OTP to mobile number (you'll need to implement this)

    sendOTP(mobileNumber, otp);

    // Respond with success message
    res.status(200).json({
      message:
        "User details submitted successfully. Please verify mobile number with OTP.",
    });
  } catch (error) {
    console.error("Error submitting details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const OtpVerification = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    // Retrieve user details and OTP from temporary storage
    const userDetails = req.session.userDetails;
    if (!userDetails) {
      return res.status(400).json({
        error: "User details not found. Please submit user details first.",
      });
    }
    // Validate OTP
    if (otp !== userDetails.otp) {
      return res.status(400).json({ error: "Invalid OTP. Please try again." });
    }
    // OTP verification successful, store user details in permanent database
    await Person.create(userDetails);
    // Clear temporary storage
    delete req.session.userDetails;
    // Respond with success message
    res.status(200).json({
      message: "Mobile number verified successfully. User details saved.",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { createPerson, OtpVerification };
