package com.bankov.bookstorebackend.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalEndpointExceptionHandler {
    //Used for handling errors thrown by Spring Validation, which are the same across all controllers
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();
        Map<String, String> map = new HashMap<>(errors.size());
        errors.forEach((error) -> {
            String key = ((FieldError) error).getField();
            String val = error.getDefaultMessage();
            map.put(key, val);
        });
        return ResponseEntity.badRequest().body(map);
    }

    @ExceptionHandler(FileIsNotImageException.class)
    public ResponseEntity<Map<String, String>> handleFileIsNotImageExceptions(FileIsNotImageException ex) {
        Map<String, String> body = new HashMap<>();
        body.put(ex.getField(), ex.getMessage());
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<Map<String, String>> handleIOExceptions(IOException ex) {
        Map<String, String> body = new HashMap<>();
        body.put("image", ex.getMessage());
        return ResponseEntity.badRequest().body(body);
    }
}
