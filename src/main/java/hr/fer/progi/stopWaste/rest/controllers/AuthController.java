package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.rest.dto.request.RegisterUserDTO;
import hr.fer.progi.stopWaste.rest.dto.request.SignInUserDTO;
import hr.fer.progi.stopWaste.rest.dto.response.JwtResponse;
import hr.fer.progi.stopWaste.rest.dto.response.MessageResponse;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.security.services.UserDetailsImpl;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
   private final AuthenticationManager authenticationManager;

   private final UserService userService;

   private final JwtUtils jwtUtils;

   public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtils jwtUtils) {
      this.authenticationManager = authenticationManager;
      this.userService = userService;
      this.jwtUtils = jwtUtils;
   }

   @PostMapping("/signin")
   public ResponseEntity<?> signIn(@Valid @RequestBody SignInUserDTO signinUserDTO) {

      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(signinUserDTO.getUsername(), signinUserDTO.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.generateJwtToken(authentication);

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      List<String> roles = userDetails.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.toList());

      return ResponseEntity.ok(new JwtResponse(jwt,
              userDetails.getIdUser(),
              userDetails.getUsername(),
              userDetails.getEmail(),
              roles));
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
