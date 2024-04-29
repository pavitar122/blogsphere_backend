import { v2 as cloudinary } from 'cloudinary';
try{
    cloudinary.config({
        cloud_name: 'dflkzguu6',
        api_key: '772639724797857',
        api_secret: 'ua9RNX2nj8B9mmsdBGtSlHL6xj4'
    });
} catch(error){
    console.log(error);
}