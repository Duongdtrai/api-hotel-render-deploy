import { Router } from 'express';
import multer from '../middlewares/multer';
import UploadController from '../controllers/Upload';
const router = Router();
/**
 * @openapi
 * /upload/image:
 *   post:
 *     tags:
 *      - "[UPLOAD]: image"
 *     summary: upload image
 *     consumes:
 *      - "multipart/form-data"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "formData"
 *        name: "files"
 *        description: "files"
 *        required: false
 *        allowMultiple: false
 *        type: "file"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/image', multer.single('files'), UploadController.uploadImage);

/**
 * @openapi
 * /upload/excel:
 *   post:
 *     tags:
 *      - "[UPLOAD]: image"
 *     summary: download excel
 *     consumes:
 *      - "multipart/form-data"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "formData"
 *        name: "file"
 *        description: "file"
 *        required: false
 *        allowMultiple: false
 *        type: "file"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/excel', multer.single('file'), UploadController.uploadExcel);
/**
 * @openapi
 * /upload/image/{cloudinaryId}:
 *   delete:
 *     tags:
 *      - "[UPLOAD]: image"
 *     summary: destroy image
 *     parameters:
 *      - in: "path"
 *        name: "cloudinaryId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete('/image/:cloudinaryId', UploadController.removeImage);

/**
 * @openapi
 * /upload/download:
 *   get:
 *     tags:
 *      - "[UPLOAD]: image"
 *     summary: download excel
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/download', UploadController.exportExcel);
export default router;
