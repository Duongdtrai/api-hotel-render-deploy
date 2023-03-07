"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("./user");
const admin_1 = require("./admin");
const Account_1 = require("./Account");
const Upload_1 = require("./Upload");
const router = (0, express_1.Router)();
router.use('/u', user_1.default);
router.use('/a', admin_1.default);
router.use('/session', Account_1.default);
router.use('/upload', Upload_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map