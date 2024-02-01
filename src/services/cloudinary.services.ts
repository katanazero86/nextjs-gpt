import {v2 as cloudinary} from 'cloudinary';
import {v4 as uuidv4} from 'uuid';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export class CloudinaryServices {
    async uploadImage(targetImgUrl: string) {
        //'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg'
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(targetImgUrl,
                {public_id: uuidv4(), format: 'webp', upload_preset: 'ml_default', folder: 'animals'},
                function (error, result) {
                    console.log(result, error);
                    if (error !== undefined) {
                        reject(error);
                    } else {
                        const {
                            public_id,
                            format,
                            url,
                            secure_url,
                        } = result!
                        resolve({
                            public_id,
                            format,
                            url,
                            secure_url
                        });
                    }
                });
        });

    }
}