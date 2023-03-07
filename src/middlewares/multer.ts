import * as path from 'path';
import { Request } from 'express';
import * as multer from 'multer';

export default multer({
    storage: multer.diskStorage({
        // destination: (req: Request, file: any, cb: any) => { // chỗ để save file vào đâu trong máy
        //     cb(null, '../upload');
        // },
        filename: (req: Request, file: any, cb: any) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (req: Request, file: any, cb: any) => { // kiểm tra đường dẫn file có hợp lệ không?
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
