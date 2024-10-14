package com.project1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseService<T> {
    private String message;
    private T data;
}
