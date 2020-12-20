package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.RegisterUserDTO;
import hr.fer.progi.stopWaste.rest.dto.response.UserProfileDto;

import java.util.List;
import java.util.Optional;


public interface UserService {

    List<User> listAll();

    User registerUser(User user);

    User registerUser(RegisterUserDTO user);

    Optional<User> findByUsername(String userName);

    void updateUser(String userName , User user);

   boolean existsByUsername(String username);

    boolean existsByEmail(String email);

   Optional<UserProfileDto> findByJwtToken(String jwtToken);
}
