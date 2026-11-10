import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Video schema
const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // Cloudinary video URL
      required: true,
    },
    thumbnail: {
      type: String, // Cloudinary thumbnail URL
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // Video duration
      required: true,
    },
    views: {
      type: Number,
      default: 0, // Default views
    },
    isPublished: {
      type: Boolean,
      default: true, // Video is published by default
    },
    owner: {
      type: Schema.Types.ObjectId, // User ID
      ref: "User", // Reference to User model
    },
  },
  { timestamps: true }
);

// Add pagination plugin
videoSchema.plugin(mongooseAggregatePaginate);

// Create Video model
export const Video = mongoose.model("Video", videoSchema);
