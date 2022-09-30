package capstone_project.controllers;

import capstone_project.domain.Result;
import capstone_project.domain.ResultType;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ValidationException;
import java.util.List;

@ControllerAdvice
public class ErrorResponse {

    public static <T> ResponseEntity<Object> build(Result<T> result) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (result.getType() == null || result.getType() == ResultType.INVALID) {
            status = HttpStatus.BAD_REQUEST;
        } else if (result.getType() == ResultType.NOT_FOUND) {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result.getMessages(), status);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
        // log the exception

        return new ResponseEntity<>("Could not find instance", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrity(DataIntegrityViolationException ex){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {


        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return new ResponseEntity<>("Something went wrong, please let the developers know", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<List<String>> handleValidationException(ValidationException ex) {
        return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException ex) {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

}
