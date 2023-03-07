"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Excel = require("exceljs");
const cloudinary_1 = require("../utils/cloudinary");
const xlsx = require('xlsx');
class UploadController {
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.file);
                const result = yield cloudinary_1.default.uploader.upload(req.file.path, { folder: 'myFolder' });
                res.status(200).json({
                    image: result.secure_url,
                    cloudinary_id: result.public_id,
                });
                console.log(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    removeImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cloudinary_1.default.uploader.destroy(req.params.cloudinaryId);
                res.status(200).json({
                    message: 'success',
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    uploadExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workbook = xlsx.readFile(req.file.path);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const dataExcel = xlsx.utils.sheet_to_json(sheet);
                const expectedKeys = ['stt', 'masv', 'hoten', 'ngaysinh', 'tenlop', 'GHI CHÚ'];
                const keys = Object.keys(dataExcel[0]);
                keys.forEach((key, index) => {
                    if (key !== expectedKeys[index]) {
                        return res.status(400).send('Invalid validation key');
                    }
                });
                res.status(200).json({
                    message: 'success',
                    data: dataExcel,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: 'error',
                });
            }
        });
    }
    exportExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [
                { name: 'John', age: 30, email: 'john@example.com' },
                { name: 'Jane', age: 25, email: 'jane@example.com' },
                { name: 'Bob', age: 40, email: 'bob@example.com' },
            ];
            console.log('Data', data);
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('sheet1');
            worksheet.columns = [
                { header: 'Name', key: 'name' },
                { header: 'Age', key: 'age' },
                { header: 'Email', key: 'email' },
            ];
            worksheet.addRows(data);
            const fileName = 'FileName.xlsx';
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
            workbook.xlsx.write(res)
                .then(function () {
                res.status(200).json({
                    data,
                });
            });
        });
    }
}
exports.default = new UploadController();
//# sourceMappingURL=Upload.js.map