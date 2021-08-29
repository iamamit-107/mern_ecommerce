const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// instance method can be called with User object
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// this is being called every time when adding or updating user
userSchema.pre("save", async function (next) {
  // if password is not updating then dont hash the password. go to the next step
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
