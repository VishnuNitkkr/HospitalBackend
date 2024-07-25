export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000), // Default to 7 days if not set
      secure: process.env.NODE_ENV === 'production', // Ensure HTTPS in production
      sameSite: 'None', // Allows cross-origin cookies
      httpOnly: true, // Prevents JavaScript access
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
