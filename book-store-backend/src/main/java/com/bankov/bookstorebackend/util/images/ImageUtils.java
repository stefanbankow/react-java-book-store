package com.bankov.bookstorebackend.util.images;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;

public class ImageUtils {
    public static String getImageIdFromURL(String url) {
        String[] splitUrl = url.split("/");
        String imageIdAndType = splitUrl[splitUrl.length - 1];

        return imageIdAndType.split("\\.")[0];
    }

    public static boolean isImageFileBasedOnServletContext(MultipartFile file, ServletContext servletContext) {
        return servletContext.getMimeType(file.getOriginalFilename()).startsWith("image/");
    }
}
