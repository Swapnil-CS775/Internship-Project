const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Utility to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Create a transporter using Gmail SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace this with other services (SendGrid, Mailgun, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app-specific password
  },
});

// Function to send OTP email
const sendEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Receiver's email address
    subject: 'Your OTP Code', // Subject line
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`, // Plain text version of the email
    html: `<strong>Your OTP is ${otp}. It is valid for 10 minutes.</strong>`, // HTML version of the email
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Step 1: Request OTP
exports.requestOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    await sendEmail(email, otp); // Send OTP via email
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Step 2: Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      console.log("Invalid or expired OTP");
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Step 3: Reset Password
exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate password and confirmPassword
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one special character.',
      });
    }

    // Update password
    // user.password = await bcrypt.hash(newPassword, 10);
    // await user.save();
    //here because of above code error came - as we are using 
    //Pre-save middleware to hash the password in user model so no need to hash password here
    //because this middleware will run every time before we use .save() method 
    user.password = newPassword; // Directly store the new password
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Error resetting password:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
