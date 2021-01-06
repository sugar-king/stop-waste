package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.rest.dto.request.RegisterUserDTO;
import hr.fer.progi.stopWaste.rest.dto.request.SignInUserDTO;
import hr.fer.progi.stopWaste.rest.dto.response.MessageResponse;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

   private final UserService userService;

   public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtils jwtUtils) {
      this.userService = userService;
   }

   @PostMapping("/signin")
   public ResponseEntity<?> signIn(@Valid @RequestBody SignInUserDTO signinUserDTO) {
      return ResponseEntity.ok(userService.authenticateUser(signinUserDTO));
   }


   @PostMapping("/register")
   public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
      if (userService.existsByUsername(registerUserDTO.getUsername())) {
         return ResponseEntity
                 .badRequest()
                 .body(new MessageResponse("Error: Korisničko ime je zauzeto!"));
      }

      if (userService.existsByEmail(registerUserDTO.getEmail())) {
         return ResponseEntity
                 .badRequest()
                 .body(new MessageResponse("Error: Email je zauzet!"));
      }

      userService.registerUser(registerUserDTO);

      return ResponseEntity.ok(new MessageResponse("Korisnik uspješno registriran!"));
   }
}
