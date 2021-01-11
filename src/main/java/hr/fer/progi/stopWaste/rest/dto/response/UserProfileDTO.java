package hr.fer.progi.stopWaste.rest.dto.response;

import hr.fer.progi.stopWaste.domain.Address;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class UserProfileDTO {
   @NotBlank
   private String username;

   @NotBlank
   @Email
   private String email;

   private String name;

   private String surname;

   private Address address;

   private String role;
}
