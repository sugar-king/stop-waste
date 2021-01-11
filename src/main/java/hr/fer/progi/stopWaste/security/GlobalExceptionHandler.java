package hr.fer.progi.stopWaste.security;

import hr.fer.progi.stopWaste.rest.dto.response.MessageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@ControllerAdvice
public class GlobalExceptionHandler {
   @Value("${spring.servlet.multipart.max-request-size}")
   String maxSize;

   @ExceptionHandler(MaxUploadSizeExceededException.class)
   public ResponseEntity<?> handleError2(MaxUploadSizeExceededException e, RedirectAttributes redirectAttributes) {
      return ResponseEntity.badRequest().body(new MessageResponse("Datoteka prevelika. Maksimalna veličina datoteke je " + maxSize + "."));

   }
}
