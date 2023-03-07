import { Request, Response } from 'express';
import * as Excel from 'exceljs';
import cloudinaryV2 from '../utils/cloudinary';
const xlsx = require('xlsx');
class UploadController {
    public async uploadImage (req: Request, res: Response) {
        try {
            console.log(req.file);

            // Upload image to cloudinary
            const result = await cloudinaryV2.uploader.upload(req.file.path, { folder: 'myFolder' });
            res.status(200).json({
                image: result.secure_url,
                cloudinary_id: result.public_id,
            });
            console.log(result);

            // Create new user
        } catch (err) {
            console.log(err);
        }
    }

    public async removeImage (req: Request, res: Response) {
        try {
            await cloudinaryV2.uploader.destroy(req.params.cloudinaryId);
            res.status(200).json({
                message: 'success',
            });
        } catch (error) {
            console.log(error);
        }
    }

    public async uploadExcel (req: Request, res: Response) {
        try {
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const dataExcel = xlsx.utils.sheet_to_json(sheet);
            const expectedKeys = ['stt', 'masv', 'hoten', 'ngaysinh', 'tenlop', 'GHI CHÚ'];
            const keys = Object.keys(dataExcel[0]);
            keys.forEach((key: any, index: number) => {
                // eslint-disable-next-line no-empty
                if (key !== expectedKeys[index]) {
                    return res.status(400).send('Invalid validation key');
                }
            });
            res.status(200).json({
                message: 'success',
                data: dataExcel,
            });
        } catch (error) {
            res.status(500).json({
                message: 'error',
            });
        }
    }

    public async exportExcel (req: Request, res: Response) {
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
    }
}

export default new UploadController();
