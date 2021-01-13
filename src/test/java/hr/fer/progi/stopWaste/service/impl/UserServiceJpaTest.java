package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.RoleRepository;
import hr.fer.progi.stopWaste.dao.UserRepository;
import hr.fer.progi.stopWaste.domain.ERole;
import hr.fer.progi.stopWaste.domain.Role;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.RegisterUserDTO;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.service.AddressService;
import hr.fer.progi.stopWaste.service.CategoryService;
import hr.fer.progi.stopWaste.service.RequestDeniedException;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
class UserServiceJpaTest {
   @Mock
   UserRepository userRepository = mock(UserRepository.class);
   @Mock
   AddressService addressService;
   @Mock
   RoleRepository roleRepository = mock(RoleRepository.class);
   @Mock
   JwtUtils jwtUtils;
   @Mock
   CategoryService categoryService;
   @Mock
   PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
   @Mock
   AuthenticationManager authenticationManager;
   @Spy
   @InjectMocks
   UserServiceJpa userService = new UserServiceJpa(userRepository, addressService, roleRepository, jwtUtils, categoryService, passwordEncoder, authenticationManager);

   @Before
   void init() {
      MockitoAnnotations.initMocks(this);
   }

   @Test
   public void registerUserReturnsUser() {
      User testUser = new User("test", "test@test.hr", "newPassword", null, null);
      when(passwordEncoder.encode(any(String.class))).thenReturn("newPassword");
      when(userRepository.save(any(User.class))).thenReturn(testUser);
      when(roleRepository.findByName(any(ERole.class))).thenReturn(Optional.of(new Role(ERole.ROLE_SELLER)));
      RegisterUserDTO registerUserDTO = new RegisterUserDTO("test", "test@test.hr", "testing");

      User user = userService.registerUser(registerUserDTO);
      assertEquals(registerUserDTO.getUsername(), user.getUsername());
   }

   @Test
   public void registerUserWithSameEmailThrows() {
      User testUser = new User("test", "test@test.hr", "newPassword", null, null);
      when(passwordEncoder.encode(any(String.class))).thenReturn("newPassword");
      when(userRepository.save(any(User.class))).thenReturn(testUser);
      when(userRepository.existsByEmail("test@test.hr")).thenReturn(true);
      when(roleRepository.findByName(any(ERole.class))).thenReturn(Optional.of(new Role(ERole.ROLE_SELLER)));
      RegisterUserDTO registerUserDTO = new RegisterUserDTO("test", "test@test.hr", "testing");

      assertThrows(RequestDeniedException.class, () -> userService.registerUser(registerUserDTO));
   }
   @Test
   public void registerUserWithSameUsernameThrows() {
      User testUser = new User("test", "test@test.hr", "newPassword", null, null);
      when(passwordEncoder.encode(any(String.class))).thenReturn("newPassword");
      when(userRepository.save(any(User.class))).thenReturn(testUser);
      when(userRepository.existsByUsername(any(String.class))).thenReturn(true);
      when(roleRepository.findByName(any(ERole.class))).thenReturn(Optional.of(new Role(ERole.ROLE_SELLER)));
      RegisterUserDTO registerUserDTO = new RegisterUserDTO("test", "test@test.hr", "testing");

      assertThrows(RequestDeniedException.class, () -> userService.registerUser(registerUserDTO));
   }

}