package hr.fer.progi.stopWaste.rest.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class SigninUserDTO {
   @NotBlank
   private String username;

   @NotBlank
   private String password;
}
