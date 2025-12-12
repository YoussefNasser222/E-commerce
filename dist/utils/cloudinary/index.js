"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFromCloud = exports.uploadManyFileToCloud = exports.uploadFileToCloud = void 0;
const cloudinary_1 = require("cloudinary");
const local_config_1 = require("../../config/local.config");
cloudinary_1.v2.config({
    api_key: local_config_1.devConfig.API_KEY,
    api_secret: local_config_1.devConfig.API_SECRET,
    cloud_name: local_config_1.devConfig.CLOUD_NAME,
});
const uploadFileToCloud = async (path, folder) => {
    return await cloudinary_1.v2.uploader.upload(path, {
        folder,
    });
};
exports.uploadFileToCloud = uploadFileToCloud;
const uploadManyFileToCloud = async (paths, folder) => {
    const uploads = paths.map((path) => {
        return cloudinary_1.v2.uploader.upload(path, {
            folder,
        });
    });
    return await Promise.all(uploads);
};
exports.uploadManyFileToCloud = uploadManyFileToCloud;
const deleteFileFromCloud = async (path) => {
    await cloudinary_1.v2.api.delete_resources_by_prefix(path);
    await cloudinary_1.v2.api.delete_folder(path);
};
exports.deleteFileFromCloud = deleteFileFromCloud;
