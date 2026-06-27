const jwt = require("jsonwebtoken");

const googleClient = require("../config/google");
const jwtConfig = require("../config/jwt");

exports.googleLogin = async (idToken) => {
  if (!idToken) {
    throw {
      status: 400,
      code: 400,
      message: "Google ID Token is required.",
    };
  }

  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.sub) {
    throw {
      status: 401,
      code: 401,
      message: "Invalid Google ID Token.",
    };
  }

  const { sub, email, name, picture } = payload;

  const access_token = jwt.sign(
    {
      userId: sub,
    },
    jwtConfig.secret,
    {
      expiresIn: jwtConfig.expiresIn,
    },
  );

  return {
    code: 200,
    message: "successful",
    data: {
      access_token,
      expires_in: 3600,
      user: {
        id: sub,
        email,
        name,
        avatar: picture,
      },
    },
  };
};
