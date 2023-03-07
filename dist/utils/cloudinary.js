"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
dotenv.config();
const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
exports.default = cloudinaryV2;
//# sourceMappingURL=cloudinary.js.map