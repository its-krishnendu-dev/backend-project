import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // STEP 1: Get user details from the frontend request body
  const { userName, fullName, email, password } = req.body;

  // STEP 2: Validate required fields (check empty or missing values)
  if ([userName, fullName, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // STEP 3: Check whether a user already exists with the same username or email
  const existedUser = await User.findOne({
    $or: [{ userName: userName.toLowerCase() }, { email: email.toLowerCase() }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // STEP 4: Get uploaded image paths from the server's local storage
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // STEP 5: Avatar is required, but cover image is optional
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // STEP 6: Upload images to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  // Upload cover image only if the user provided one
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  // STEP 7: Check whether avatar upload was successful
  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // STEP 8: Create a new user document and save it in MongoDB
  const user = await User.create({
    fullName: fullName.trim(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email: email.toLowerCase().trim(),
    password,
    userName: userName.toLowerCase().trim(),
  });

  // STEP 9: Fetch the created user without sensitive information
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // STEP 10: Check whether user was successfully created
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  // STEP 11: Send success response to the frontend
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
