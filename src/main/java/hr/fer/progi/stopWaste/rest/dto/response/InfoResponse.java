package hr.fer.progi.stopWaste.rest.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InfoResponse {
   private String message;

   public InfoResponse(String message) {
      this.message = message;
   }
}
