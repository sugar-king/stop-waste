package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.RegisterUserDTO;
import hr.fer.progi.stopWaste.rest.dto.request.SignInUserDTO;
import hr.fer.progi.stopWaste.rest.dto.request.UpdateUserDTO;
import hr.fer.progi.stopWaste.rest.dto.response.JwtResponse;
import hr.fer.progi.stopWaste.rest.dto.response.UserProfileDTO;

import java.util.List;
import java.util.Optional;


public interface UserService {

    List<User> listAll();

    User registerUser(User user);

    User registerUser(RegisterUserDTO user);

    Optional<User> findByUsername(String userName);

    User updateUser(String userName, UpdateUserDTO user);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Optional<UserProfileDTO> findByJwtToken(String jwtToken);

    JwtResponse authenticateUser(SignInUserDTO signinUserDTO);
}
