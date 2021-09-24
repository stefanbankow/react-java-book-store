package com.bankov.bookstorebackend.util.images.uploaders;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageUploader {
    public String uploadNewImage(MultipartFile image) throws IOException;

    public String updateImage(MultipartFile image, String oldImageURL) throws IOException;

    public void deleteImage(String imageID) throws Exception;
}
