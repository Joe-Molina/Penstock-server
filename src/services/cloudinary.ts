import { v2 as cloudinary } from 'cloudinary';
import fs from "fs-extra"

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dn3yu35da', 
        api_key: '738526594394977', 
        api_secret: 'bzrGee11Kh4uRuOVzNTjk1bJi3I',
        secure: true
    });


    
    // Upload an image
   export const uploadImg = async(filePath: string) => {

    try {
        const result = await cloudinary.uploader.upload(
            filePath, {
                folder: 'pedidos-img'
            }
        )
    
        console.log(result)
    
        const url = cloudinary.url(result.public_id, {
         transformation: [
             {
                 quality: 'auto',
                 fetch_format: 'auto'
             },
             {
                 width: 300,
                 heigth: 300
             }
    
         ]
        })
        // anadir la eliminacion del archivo posteriormente
        fs.unlink(filePath)
        return url
        
    } catch (error) {
        console.log(error)
    }

    }
;