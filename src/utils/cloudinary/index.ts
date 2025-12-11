import { v2 as cloudinary } from "cloudinary";
import { devConfig } from "../../config/local.config";
import { promise } from "zod";

cloudinary.config({
  api_key: devConfig.API_KEY,
  api_secret: devConfig.API_SECRET,
  cloud_name: devConfig.CLOUD_NAME,
});
export const uploadFileToCloud = async (path: string, folder: string) => {
  return await cloudinary.uploader.upload(path, {
    folder,
  });
};
export const uploadManyFileToCloud = async (
  paths: string[],
  folder: string
) => {
  const uploads = paths.map((path) => {
    return cloudinary.uploader.upload(path, {
      folder,
    });
  });
  return await Promise.all(uploads);
};

export const deleteFileFromCloud = async (path: string) => {
  await cloudinary.api.delete_resources_by_prefix(path);
  await cloudinary.api.delete_folder(path);
};
