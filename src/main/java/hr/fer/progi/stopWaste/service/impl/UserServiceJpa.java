package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.RoleRepository;
import hr.fer.progi.stopWaste.dao.UserRepository;
import hr.fer.progi.stopWaste.domain.Category;
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
import hr.fer.progi.stopWaste.service.CategoryService;
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
import org.springframework.transaction.annotation.Transactional;
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

   private final CategoryService categoryService;

   private final PasswordEncoder encoder;

   private final AuthenticationManager authenticationManager;

   public UserServiceJpa(UserRepository userRepository, AddressService addressService, RoleRepository roleRepository, JwtUtils jwtUtils, CategoryService categoryService, PasswordEncoder encoder, AuthenticationManager authenticationManager) {
      this.userRepository = userRepository;
      this.addressService = addressService;
      this.roleRepository = roleRepository;
      this.jwtUtils = jwtUtils;
      this.categoryService = categoryService;
      this.encoder = encoder;
      this.authenticationManager = authenticationManager;
   }

   @Override
   public List<User> listAll() {
      return userRepository.findAll();
   }

   @Transactional
   @Override
   public User registerUser(RegisterUserDTO registerUserDTO) {

      registerUserDTO.setPassword(encoder.encode(registerUserDTO.getPassword()));

      checkUserName(registerUserDTO.getUsername());
      checkEmail(registerUserDTO.getEmail());

      ModelMapper mapper = new ModelMapper();

      User user = mapper.map(registerUserDTO, User.class);

      Set<Role> roles = new HashSet<>();

      adjustRoles(roles, registerUserDTO.getRole());

      user.setRoles(roles);

      if (user.getPreferredCategories() != null) {
         Set<Category> categories = user.getPreferredCategories();
         Set<Category> newCategories = new HashSet<>();
         for (Category category : user.getPreferredCategories()) {
            newCategories.add(categoryService.createCategory(category));
         }
         user.setPreferredCategories(newCategories);
      }

      if (registerUserDTO.getAddress() != null) {
         user.setAddress(addressService.createAddress(registerUserDTO.getAddress()));
      }


      return userRepository.save(user);
   }

   @Transactional
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

      if (authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(userName, newUser.getOldPassword())) == null) {
         return null;
      }
      if (!newUser.getUsername().isBlank()) {
         if (!newUser.getUsername().equals(user.getUsername()) && userRepository.existsByUsername(newUser.getUsername())) {
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
         user.setAddress(addressService.createAddress(newUser.getAddress()));
      }

      if (newUser.getPrefferedCategories() != null) {
         Set<Category> preferredCategories = user.getPreferredCategories();
         if (preferredCategories != null) {
            preferredCategories.clear();
            for (Category category : newUser.getPrefferedCategories()) {
               preferredCategories.add(categoryService.createCategory(category));
            }
         }
      }

      Set<Role> roles = user.getRoles();
      roles.clear();

      adjustRoles(roles, newUser.getRole());
      userRepository.save(user);

      return user;
   }

   @Override
   public JwtResponse authenticateUser(SignInUserDTO signinUserDTO) {
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
              roles,
              userDetails.getPreferredCategories());
   }

   @Override
   public Optional<User> findByUsername(String userName) {
      return userRepository.findByUsername(userName);
   }

   private void adjustRoles(Set<Role> roles, String strRole) {
      Optional<Role> role;
      Role userRole;
      if ((role = roleRepository.findByName(ERole.ROLE_BUYER)).isEmpty()) {
         userRole = roleRepository.save(new Role(ERole.ROLE_BUYER));
      } else {
         userRole = role.get();
      }
      roles.add(userRole);

      if (strRole != null) {

         switch (strRole) {

            case "admin":
               Role adminRole;
               if ((role = roleRepository.findByName(ERole.ROLE_ADMIN)).isEmpty()) {
                  adminRole = roleRepository.save(new Role(ERole.ROLE_ADMIN));
               } else {
                  adminRole = role.get();
               }

               roles.add(adminRole);

               break;
            case "seller":
               Role sellerRole;
               if ((role = roleRepository.findByName(ERole.ROLE_SELLER)).isEmpty()) {
                  sellerRole = roleRepository.save(new Role(ERole.ROLE_SELLER));
               } else {
                  sellerRole = role.get();
               }

               roles.add(sellerRole);

               break;
         }
      }
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
      ModelMapper modelMapper = new ModelMapper();

      Optional<User> user = userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwtToken));
      if (user.isEmpty()) {
         return Optional.empty();
      }
      UserProfileDTO userProfileDto = modelMapper.map(user.get(), UserProfileDTO.class);

      if (roleRepository.findByName(ERole.ROLE_ADMIN).isPresent() && user.get().getRoles().contains(roleRepository.findByName(ERole.ROLE_ADMIN).get())) {
         userProfileDto.setRole("admin");
      } else {
         if (roleRepository.findByName(ERole.ROLE_SELLER).isPresent() && user.get().getRoles().contains(roleRepository.findByName(ERole.ROLE_SELLER).get())) {
            userProfileDto.setRole("seller");
         } else {
            userProfileDto.setRole("buyer");
         }
      }
      return Optional.of(userProfileDto);
   }

   private void checkUserName(String userName) {
      if (userRepository.existsByUsername(userName)) {
         throw new RequestDeniedException("Username " + userName + " already exists.");
      }
   }

   private void checkEmail(String email) {
      if (userRepository.existsByEmail(email)) {
         throw new RequestDeniedException("Email address " + email + " is already in use.");
      }

      Assert.hasText(email, "Email must be given");
   }
}
