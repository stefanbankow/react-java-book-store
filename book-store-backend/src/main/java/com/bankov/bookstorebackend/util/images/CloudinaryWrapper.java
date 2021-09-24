package com.bankov.bookstorebackend.util.images;

import com.cloudinary.Cloudinary;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

public class CloudinaryWrapper {

    private final Cloudinary cloudinary;

    public CloudinaryWrapper(String cloudinaryURL) {
        this.cloudinary = new Cloudinary(cloudinaryURL);
    }

    @SuppressWarnings("rawtypes")
    public String uploadImage(MultipartFile image, Map uploadOptions) throws IOException {
        File imageFile = File.createTempFile("image", image.getOriginalFilename());
        image.transferTo(imageFile);

        Map imageResponse = cloudinary.uploader().upload(imageFile, uploadOptions);

        return imageResponse.get("url").toString();
    }

    @SuppressWarnings("rawtypes")
    public void deleteResources(Iterable<String> publicIds, Map deleteOptions) throws IOException {
        try {
            cloudinary.api().deleteResources(publicIds, deleteOptions);
        } catch (Exception e) {
            throw new IOException(e.getMessage());
        }
    }


}
