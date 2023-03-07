"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const multer = require("multer");
exports.default = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        console.log('file ' + JSON.stringify(file));
        console.log('originname ' + file.originalname);
        const ext = path.extname(file.originalname);
        console.log('ext ' + ext);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.xlsx') {
            cb(new Error('Unsupported file type!'), false);
            return;
        }
        cb(null, true);
    },
});
//# sourceMappingURL=multer.js.map