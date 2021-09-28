package com.bankov.bookstorebackend.util.images.uploaders;

import com.bankov.bookstorebackend.util.images.CloudinaryWrapper;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.bankov.bookstorebackend.util.images.ImageUtils.getImageIdFromURL;

public class BookImageUploader implements ImageUploader {
    private final CloudinaryWrapper cloudinaryWrapper;

    public BookImageUploader(String cloudinaryURL) {
        this.cloudinaryWrapper = new CloudinaryWrapper(cloudinaryURL);
    }

    @Override
    public String uploadNewImage(MultipartFile image) throws IOException {
        return cloudinaryWrapper.uploadImage(image, ObjectUtils.asMap("folder", "book_covers"));
    }


    @Override
    public String updateImage(MultipartFile image, String oldImageURL) throws IOException {
        if (oldImageURL == null) {
            return uploadNewImage(image);
        }
        String imageId = getImageIdFromURL(oldImageURL);

        return cloudinaryWrapper.uploadImage(image, ObjectUtils.asMap(
                "public_id", imageId,
                "folder", "book_covers"));
    }

    @Override
    public void deleteImage(String imageURL) throws IOException {
        String imageId = getImageIdFromURL(imageURL);
        cloudinaryWrapper.deleteResources(List.of("book_covers/" + imageId), ObjectUtils.emptyMap());
    }
}
