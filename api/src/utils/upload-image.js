import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (buffer) => {
    try {
        const response = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                )
                .end(buffer);
        });
        return response;
    } catch (err) {
        return err;
    }
};

export { uploadImage };
