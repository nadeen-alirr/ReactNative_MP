const user = require("../model/UsersModel");
const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const fs = require('fs');
const uploadimage = multer().single('profileImage');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const newUser = new user({
        username,
        email,
        password,
      });

      await newUser.save();
      const token = newUser.generateAuthToken();
      console.log("Generated Token:", token); // Add this line for debugging
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Received Authorization header:", authHeader);

  if (!authHeader) {
    console.log("No Authorization header found.");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const tokenPart = authHeader.split(" ")[1]; // Get the second part after splitting by spaces
  console.log("Token Part:", tokenPart);
  console.log("JWT Secret:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(403).json({ error: "Invalid token." });
  }
};

const login = async (req, res, next) => {
  console.log('Login function called');
  const { email, password } = req.body;

  console.log("email login backend " + email)
  console.log("password login backend " + password)
  try {
    const foundUser = await user.findOne({ email: email });
    if (!foundUser) {
      return res.json({ status: "error", message: "User didn't exist!" });
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.json({
        status: "error",
        message: "Username or Password is not correct",
      });
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
      },
      process.env.JWT_SECRET
    );

    console.log("the token in backend" + token)

    return res.json({
      status: "success",
      token,
      userID: foundUser._id,
      name: foundUser.username,
    });

  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};

// const password = async (req, res, next) => {

// }
// const update = async (req, res, next) => {

// }

const upload = async (req, res) => {

  uploadimage(req, res, (err) => {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(500).json({ success: false, error: 'Error uploading image' });
    }

    const file = req.file;


    const filePath = `temp/${file.originalname}`;
    console.log('Saving file to:', filePath); // Add this line
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error('Error saving file:', err);
        return res.status(500).json({ success: false, error: 'Error saving file' });
      }
      console.log('File saved successfully:', filePath); // Add this line


      cloudinary.uploader.upload(filePath, (error, result) => {
        // Delete the temporary file after upload
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          } else {
            console.log('Temporary file deleted:', filePath); // Add this line
          }
        });

        if (error) {
          console.error('Error uploading image to Cloudinary:', error);
          res.status(500).json({ success: false, error: 'Error uploading image to Cloudinary' });
        } else {
          // Result will contain the Cloudinary URL of the uploaded image
          const imageUrl = result.secure_url;
          console.log('Image uploaded to Cloudinary. URL:', imageUrl); // Add this line
          res.json({ success: true, imageUrl });
        }
      });
    });
  });
}

// const addinfocard = async(req,res)=>{
//   try {
//     const { userId } = req.params;
//     const { nameOnCard, cardNumber, expiryDate, cvc, cardType } = req.body;

//     // Find the user by ID
//     const foundUser = await user.findById(userId);

//     if (!foundUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }


//     foundUser.cards.push({ nameOnCard, cardNumber, expiryDate, cvc, cardType });

//     // Save the user document with the updated card information
//     await foundUser.save();

//     return res.status(200).json({ message: 'Card information added successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
const editinfo = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed in the URL params
    const { username, email } = req.body; // Assuming these are the fields to be edited

    const foundUser = await user.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) {
      foundUser.username = username;
    }

    if (email) {
      foundUser.email = email;
    }



    await foundUser.save();

    return res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

}
module.exports = { Signup, verifyToken, login, upload, editinfo };
