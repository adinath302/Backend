const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register controller
const registerUser = async (req, res) => {
  const { username, email, password, role = "user" } = req.body;

  // check whether any of this data is allready available (seperately/induvisually) - means check if this username or email is exists in any user indivisually
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // hashing the password
  const hash = await bcrypt.hash(password, 10);

  // created the user
  const user = userModel.create({
    username,
    email,
    password: hash,
    role,
  });
  console.log("user", user);

  // create token
  const token = jwt.sign(
    {
      id: user._id,
      role: (await user).role,
    },
    process.env.JWT_SECRET,
  );
  console.log("token", token);

  // passed the token to cookie
  res.cookie("token", token);

  res.status(201).json({
    message: "User register successfully",
    user: {
      id: (await user)._id,
      username: (await user).username,
      email: (await user).email,
      role: (await user).role,
    },
  });
};

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  // check the user in the database
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // check if the user data is not available
  if (!user) {
    return res.status(401).json({ message: "Invalid credintials" });
  }

  // confirming the using using password after hashing (it first create the password to hash and they compare it with the database password)
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // if password is wrong
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials (password)" });
  }

  // create a token
  const token = await jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  // passed it to the cookie
  res.cookie("token", token);

  res.status(200).json({
    messsage: "User logged in succesfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

module.exports = { registerUser, loginUser };
