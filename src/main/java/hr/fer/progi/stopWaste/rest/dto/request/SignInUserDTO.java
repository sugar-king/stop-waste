package hr.fer.progi.stopWaste.rest.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class SignInUserDTO {
   @NotBlank
   private String username;

   @NotBlank
   private String password;

   public SignInUserDTO() {
   }

   public SignInUserDTO(@NotBlank String username, @NotBlank String password) {
      this.username = username;
      this.password = password;
   }
}
