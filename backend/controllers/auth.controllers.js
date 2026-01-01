const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed, role });

  res.status(201).json({ message: "User registered" });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

module.exports = { register, login };