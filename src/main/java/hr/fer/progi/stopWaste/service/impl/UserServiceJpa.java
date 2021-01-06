package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.RoleRepository;
import hr.fer.progi.stopWaste.dao.UserRepository;
import hr.fer.progi.stopWaste.domain.ERole;
import hr.fer.progi.stopWaste.domain.Role;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.RegisterUserDTO;
import hr.fer.progi.stopWaste.rest.dto.request.SignInUserDTO;
import hr.fer.progi.stopWaste.rest.dto.request.UpdateUserDTO;
import hr.fer.progi.stopWaste.rest.dto.response.JwtResponse;
import hr.fer.progi.stopWaste.rest.dto.response.UserProfileDTO;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.security.services.UserDetailsImpl;
import hr.fer.progi.stopWaste.service.AddressService;
import hr.fer.progi.stopWaste.service.RequestDeniedException;
import hr.fer.progi.stopWaste.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceJpa implements UserService {

   private final UserRepository userRepository;

   private final RoleRepository roleRepository;

   private final AddressService addressService;

   private final JwtUtils jwtUtils;

   private final PasswordEncoder encoder;
   private AuthenticationManager authenticationManager;

   public UserServiceJpa(UserRepository userRepository, AddressService addressService, RoleRepository roleRepository, JwtUtils jwtUtils, PasswordEncoder encoder, AuthenticationManager authenticationManager) {
      this.userRepository = userRepository;
      this.addressService = addressService;
      this.roleRepository = roleRepository;
      this.jwtUtils = jwtUtils;
      this.encoder = encoder;
      this.authenticationManager = authenticationManager;
   }

   @Override
   public List<User> listAll() {
      return userRepository.findAll();
   }


   public User registerUser(User user) {
      Assert.notNull(user, "Object user must be given");
      Assert.isNull(user.getIdUser(), "Id of user must be null, not " + user.getIdUser());

      checkUserName(user.getUsername());
      checkEmail(user.getEmail());

      if (user.getAddress() != null) {
         addressService.createAddress(user.getAddress());
      }

      return userRepository.save(user);
   }

   @Override
   public User registerUser(RegisterUserDTO registerUserDTO) {

      registerUserDTO.setPassword(encoder.encode(registerUserDTO.getPassword()));
      if (registerUserDTO.getAddress() != null) {
         addressService.createAddress(registerUserDTO.getAddress());
      }

      checkUserName(registerUserDTO.getUsername());
      checkEmail(registerUserDTO.getEmail());

      ModelMapper mapper = new ModelMapper();

      User user = mapper.map(registerUserDTO, User.class);

      String strRole = registerUserDTO.getRole();
      Set<Role> roles = new HashSet<>();


      Role userRole = roleRepository.findByName(ERole.ROLE_BUYER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);

      if (strRole != null) {

         switch (strRole) {

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
         }
      }

      user.setRoles(roles);

      return userRepository.save(user);
   }

   private void checkUserName(String userName) {
      if (userRepository.existsByEmail(userName)) {
         throw new RequestDeniedException("Username " + userName + " already exists.");
      }
   }

   private void checkEmail(String email) {
      if (userRepository.existsByEmail(email)) {
         throw new RequestDeniedException("Email address " + email + " is already in use.");
      }

      Assert.hasText(email, "Email must be given");
   }

   @Override
   public JwtResponse authenticateUser(SignInUserDTO signinUserDTO) {
      System.out.println(signinUserDTO.getUsername() + ", " + signinUserDTO.getPassword());
      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(signinUserDTO.getUsername(), signinUserDTO.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.generateJwtToken(authentication);

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      List<String> roles = userDetails.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.toList());

      return new JwtResponse(jwt,
              userDetails.getIdUser(),
              userDetails.getUsername(),
              userDetails.getEmail(),
              roles);
   }

   @Override
   public Optional<User> findByUsername(String userName) {
      return userRepository.findByUsername(userName);
   }

   @Override
   public User updateUser(String userName, UpdateUserDTO newUser) {
      if (newUser == null) {
         return null;
      }
      Optional<User> userOptional = userRepository.findByUsername(userName);
      if (userOptional.isEmpty()) {
         return null;
      }
      User user = userOptional.get();

      if (encoder.encode(newUser.getOldPassword()).equals(user.getPassword())) {
         return null;
      }
      if (!newUser.getUsername().isBlank()) {
         if (!newUser.getUsername().equals(user.getUsername()) && userRepository.existsByEmail(newUser.getUsername())) {
            throw new RequestDeniedException("Username " + newUser.getUsername() + " already exists.");
         }
         user.setUsername(newUser.getUsername());
      }

      if (!newUser.getEmail().isBlank()) {
         if (!newUser.getEmail().equals(user.getEmail()) && userRepository.existsByEmail(newUser.getEmail())) {
            throw new RequestDeniedException("Email address " + newUser.getEmail() + " is already in use.");
         }
         user.setEmail(newUser.getEmail());
      }

      if (!newUser.getPassword().isBlank()) {
         user.setPassword(encoder.encode(newUser.getPassword()));
      }


      if (!newUser.getName().isBlank()) {
         user.setName(newUser.getName());
      }
      if (!newUser.getSurname().isBlank()) {
         user.setSurname(newUser.getSurname());
      }

      if (newUser.getAddress() != null) {
         if (addressService.findAddress(newUser.getAddress()).isPresent()) {
            user.setAddress(addressService.findAddress(newUser.getAddress()).get());
         } else {
            user.setAddress(addressService.createAddress(newUser.getAddress()));
         }
      }


      Set<Role> roles = user.getRoles();
      Role buyerRole = roleRepository.findByName(ERole.ROLE_BUYER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(buyerRole);

      if (newUser.getRole() != null) {

         switch (newUser.getRole()) {

            case "admin":
               Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                       .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
               roles.add(adminRole);

               break;
            case "seller":
               Role sellerRole = roleRepository.findByName(ERole.ROLE_SELLER)
                       .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
               roles.add(sellerRole);

               break;
         }
      }
      userRepository.save(user);

      return user;
   }

   @Override
   public boolean existsByUsername(String username) {
      return userRepository.existsByUsername(username);
   }

   @Override
   public boolean existsByEmail(String email) {
      return userRepository.existsByEmail(email);
   }

   @Override
   public Optional<UserProfileDTO> findByJwtToken(String jwtToken) {
      if (jwtToken.startsWith("Bearer ")) {
         jwtToken = jwtToken.substring(7);
      }
      ModelMapper modelMapper = new ModelMapper();

      Optional<User> user = userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwtToken));
      if (user.isEmpty()) {
         return Optional.empty();
      }
      UserProfileDTO userProfileDto = modelMapper.map(user.get(), UserProfileDTO.class);
      if (user.get().getRoles().contains(roleRepository.findByName(ERole.ROLE_ADMIN).get())) {
         userProfileDto.setRole("admin");
      } else {
         if (user.get().getRoles().contains(roleRepository.findByName(ERole.ROLE_SELLER).get())) {
            userProfileDto.setRole("seller");
         } else {
            userProfileDto.setRole("buyer");
         }
      }
      return Optional.of(userProfileDto);
   }
}
