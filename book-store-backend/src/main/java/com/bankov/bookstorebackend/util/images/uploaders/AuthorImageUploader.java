package com.bankov.bookstorebackend.util.images.uploaders;

import com.bankov.bookstorebackend.util.images.CloudinaryWrapper;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.bankov.bookstorebackend.util.images.ImageUtils.getImageIdFromURL;

public class AuthorImageUploader implements ImageUploader {

    private final CloudinaryWrapper cloudinaryWrapper;

    public AuthorImageUploader(String cloudinaryURL) {
        this.cloudinaryWrapper = new CloudinaryWrapper(cloudinaryURL);
    }

    @Override
    public String uploadNewImage(MultipartFile image) throws IOException {
        return cloudinaryWrapper.uploadImage(image, ObjectUtils.asMap("folder", "author_images"));
    }


    @Override
    public String updateImage(MultipartFile image, String oldImageURL) throws IOException {
        if (oldImageURL == null) {
            return uploadNewImage(image);
        }

        return cloudinaryWrapper.uploadImage(image, ObjectUtils.asMap(
                "public_id", getImageIdFromURL(oldImageURL),
                "folder", "author_images"));
    }

    @Override
    public void deleteImage(String imageURL) throws IOException {
        cloudinaryWrapper.deleteResources(List.of("author_images/" + getImageIdFromURL(imageURL)), ObjectUtils.emptyMap());
    }
}
