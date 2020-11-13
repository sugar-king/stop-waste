package hr.fer.progi.stopWaste.rest.dto.response;

import hr.fer.progi.stopWaste.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class JwtResponse {
   private String token;
   private String type = "Bearer";
   private Long id;
   private String username;
   private String email;
   private List<String> roles;

   public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
      this.token = accessToken;
      this.id = id;
      this.username = username;
      this.email = email;
      this.roles = roles;
   }

   public JwtResponse(String token, User user) {
      this.token = token;
      this.id = user.getIdUser();
      this.username = user.getUsername();
      this.email = user.getEmail();
      this.roles = user.getRoles().stream()
                     .map(role -> role.getName().toString())
                     .collect(Collectors.toList());
   }
}
