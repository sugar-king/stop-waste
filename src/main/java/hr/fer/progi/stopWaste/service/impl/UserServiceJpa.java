package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.RoleRepository;
import hr.fer.progi.stopWaste.dao.UserRepository;
import hr.fer.progi.stopWaste.domain.ERole;
import hr.fer.progi.stopWaste.domain.Role;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.RegisterUserDTO;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.service.AddressService;
import hr.fer.progi.stopWaste.service.RequestDeniedException;
import hr.fer.progi.stopWaste.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceJpa implements UserService {

   private final UserRepository userRepository;

   private final RoleRepository roleRepository;

   private final AddressService addressService;

   private final JwtUtils jwtUtils;

   private final PasswordEncoder encoder;

   public UserServiceJpa(UserRepository userRepository, AddressService addressService, RoleRepository roleRepository, JwtUtils jwtUtils, PasswordEncoder encoder) {
      this.userRepository = userRepository;
      this.addressService = addressService;
      this.roleRepository = roleRepository;
      this.jwtUtils = jwtUtils;
      this.encoder = encoder;
   }

   @Override
   public List<User> listAll() {
      return userRepository.findAll();
   }

   /* @Override
    public Korisnik stvoriKorisnika(Korisnik korisnik) {
        Assert.notNull(korisnik, "Objekt korisnik mora biti predan");
        Assert.isNull(korisnik.getIdK(), "Id korisnika mora biti null, a ne " + korisnik.getIdK());
        if (korisnikRepository.countBykIme(korisnik.getkIme()) > 0)
            throw new RequestDeniedException("Korisnicko ime " + korisnik.getkIme() + " vec postoji.");
        return korisnikRepository.save(korisnik);
    }*/

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
      Assert.isTrue(email.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"), "Email address " + email + " is not valid.");
   }


   @Override
   public Optional<User> findByUsername(String kIme) {
      return userRepository.findByUsername(kIme);
   }

   public void updateUser(String userName, User user) {
      Assert.notNull(user, "Object user must be given");

      Optional<User> u = userRepository.findByUsername(userName);
      User user2 = u.get();


      if (!user.getUsername().equals(user2.getUsername()) && userRepository.existsByEmail(user.getUsername())) {
         throw new RequestDeniedException("Username " + user.getUsername() + " already exists.");
      }

      if (!user.getEmail().equals(user2.getEmail()) && userRepository.existsByEmail(user.getEmail())) {
         throw new RequestDeniedException("Email address " + user.getEmail() + " is already in use.");
      }

      String email = user.getEmail();
      Assert.hasText(email, "Email must be given");
      Assert.isTrue(email.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"), "Email address " + email + " is not valid.");

      if (user.getAddress() != null) {
         addressService.createAddress(user.getAddress());
      }

      ModelMapper mapper = new ModelMapper();

      user2 = mapper.map(user, User.class);
      user2.setIdUser(u.get().getIdUser());
      userRepository.save(user2);
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
   public Optional<User> findByJwtToken(String jwtToken) {
      if (jwtToken.startsWith("Bearer ")) {
         jwtToken = jwtToken.substring(7);
      }
      return userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwtToken));
   }
}
