require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const verifiction = async () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  await client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: "+1 251 564 0502",
      to: "+919027640571",
    })
    .then((message) => console.log(message));
};

module.exports = { verifiction };
