"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../middlewares/multer");
const Upload_1 = require("../controllers/Upload");
const router = (0, express_1.Router)();
router.post('/image', multer_1.default.single('files'), Upload_1.default.uploadImage);
router.post('/excel', multer_1.default.single('file'), Upload_1.default.uploadExcel);
router.delete('/image/:cloudinaryId', Upload_1.default.removeImage);
router.get('/download', Upload_1.default.exportExcel);
exports.default = router;
//# sourceMappingURL=Upload.js.map