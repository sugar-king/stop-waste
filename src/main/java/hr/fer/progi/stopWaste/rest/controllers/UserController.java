package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.SignInUserDTO;
import hr.fer.progi.stopWaste.rest.dto.request.UpdateUserDTO;
import hr.fer.progi.stopWaste.rest.dto.response.UserProfileDTO;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/users")
public class UserController {

   private final UserService userService;

   public UserController(UserService userService) {
      this.userService = userService;
   }

   @GetMapping("/profile")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getCurrentUser(@RequestHeader(name = "Authorization") String token) {
      return userService.findByJwtToken(token)
              .map(ResponseEntity::ok)
              .orElse(ResponseEntity.notFound().build());
   }

   @GetMapping("/all")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<List<User>> listAll() {
      return ResponseEntity.ok().body(userService.listAll());
   }


   @GetMapping("/profile/{username}")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<User> getUser(@PathVariable("username") String username) {
      return userService.findByUsername(username)
              .map(ResponseEntity::ok)
              .orElse(ResponseEntity.notFound().build());
   }

   @PutMapping("/profile/update")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> updateUser(@RequestHeader(name = "Authorization") String token, @RequestBody UpdateUserDTO user) {
      Optional<UserProfileDTO> oldUser = userService.findByJwtToken(token);
      String lozinka = user.getPassword().isBlank() ? user.getOldPassword() : user.getPassword();
      if (oldUser.isPresent()) {
         String username = oldUser.get().getUsername();
         User newUser = userService.updateUser(username, user);
         if (newUser != null) {
            return ResponseEntity.ok(userService.authenticateUser(new SignInUserDTO(newUser.getUsername(), lozinka)));
         }
      }
      return ResponseEntity.badRequest().body("");
   }

}
