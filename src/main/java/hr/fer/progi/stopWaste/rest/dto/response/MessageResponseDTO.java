package hr.fer.progi.stopWaste.rest.dto.response;

import com.sun.istack.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageResponseDTO {
   private Long idMessage;

   @NotNull
   private String text;

   @NotNull
   private LocalDateTime time;

   @NotNull
   private String usernameReceived;

   @NotNull
   private String usernameSent;
}


