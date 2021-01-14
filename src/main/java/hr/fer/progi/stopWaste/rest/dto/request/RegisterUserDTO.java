package hr.fer.progi.stopWaste.rest.dto.request;

import hr.fer.progi.stopWaste.domain.Address;
import hr.fer.progi.stopWaste.domain.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
public class RegisterUserDTO {
   @NotBlank
   private String username;

   @NotBlank
   @Email
   private String email;

   private String password;

   private String name;

   private String surname;

   private Address address;

   private String role;

   private Set<Category> preferredCategories;

   public RegisterUserDTO(String username, String email, String password) {
      this.username = username;
      this.email = email;
      this.password = password;
   }
}
