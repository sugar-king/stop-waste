package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.RegisterUserDTO;

import java.util.List;
import java.util.Optional;


public interface UserService {

    List<User> listAll();

    User registerUser(User user);

    User registerUser(RegisterUserDTO user);

    // Optional<Korisnik> findById(Long idK);

    Optional<User> findByUserName(String userName);

    void updateUser(String userName , User user);

}
