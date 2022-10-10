// external imports
import jwt from 'jsonwebtoken';

// external imports
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

// hashing the password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
  next();
});

// generate token
userSchema.methods.generateToken = async function () {
  try {
    let generateToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token: generateToken });
    await this.save();
    return generateToken;
  } catch (error) {
    console.log(error);
  }
};

// model
const User = mongoose.model('User', userSchema);

export default User;
