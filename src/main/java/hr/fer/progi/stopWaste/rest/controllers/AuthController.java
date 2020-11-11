package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.dao.RoleRepository;
import hr.fer.progi.stopWaste.domain.ERole;
import hr.fer.progi.stopWaste.domain.Role;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.RegisterUserDTO;
import hr.fer.progi.stopWaste.rest.dto.request.SigninUserDTO;
import hr.fer.progi.stopWaste.rest.dto.response.JwtResponse;
import hr.fer.progi.stopWaste.rest.dto.response.MessageResponse;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.security.services.UserDetailsImpl;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
   @Autowired
   AuthenticationManager authenticationManager;

   @Autowired
   UserService userService;

   @Autowired
   RoleRepository roleRepository;

   @Autowired
   PasswordEncoder encoder;

   @Autowired
   JwtUtils jwtUtils;

   @PostMapping("/signin")
   public ResponseEntity<?> authenticateUser(@Valid @RequestBody SigninUserDTO signinUserDTO) {

      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(signinUserDTO.getUsername(), signinUserDTO.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.generateJwtToken(authentication);

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      List<String> roles = userDetails.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.toList());

      return ResponseEntity.ok(new JwtResponse(jwt,
              userDetails.getIsUser(),
              userDetails.getUsername(),
              userDetails.getEmail(),
              roles));
   }

   @PostMapping("/register")
   public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
      if (userService.existsByUsername(registerUserDTO.getUsername())) {
         return ResponseEntity
                 .badRequest()
                 .body(new MessageResponse("Error: Username is already taken!"));
      }

      if (userService.existsByEmail(registerUserDTO.getEmail())) {
         return ResponseEntity
                 .badRequest()
                 .body(new MessageResponse("Error: Email is already in use!"));
      }

      // Create new user's account
      User user = new User(registerUserDTO.getUsername(),
              registerUserDTO.getEmail(),
              encoder.encode(registerUserDTO.getPassword()),
              registerUserDTO.getName(),
              registerUserDTO.getSurname());

      if (registerUserDTO.getAddress() != null) {
         user.setAddress(registerUserDTO.getAddress());
      }

      Set<String> strRoles = registerUserDTO.getRoles();
      Set<Role> roles = new HashSet<>();

      if (strRoles == null) {
         Role userRole = roleRepository.findByName(ERole.ROLE_BUYER)
                 .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
         roles.add(userRole);
      } else {
         strRoles.forEach(role -> {
            switch (role) {
               case "admin":
                  Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                  roles.add(adminRole);

                  break;
               case "seller":
                  Role modRole = roleRepository.findByName(ERole.ROLE_SELLER)
                          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                  roles.add(modRole);

                  break;
               default:
                  Role userRole = roleRepository.findByName(ERole.ROLE_BUYER)
                          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                  roles.add(userRole);
            }
         });
      }

      user.setRoles(roles);
      userService.registerUser(user);

      return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
   }
}
