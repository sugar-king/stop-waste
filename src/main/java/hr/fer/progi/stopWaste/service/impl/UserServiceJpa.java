package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.UserRepository;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.RegisterUserDTO;
import hr.fer.progi.stopWaste.service.AddressService;
import hr.fer.progi.stopWaste.service.UserService;
import hr.fer.progi.stopWaste.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressService addressService;

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

        if (userRepository.countByUserName(user.getUserName()) > 0)
            throw new RequestDeniedException("Username " + user.getUserName() + " already exists.");

        if (userRepository.countByEmail(user.getEmail()) > 0)
            throw new RequestDeniedException("Email address " + user.getEmail() + " is already in use.");

        String email = user.getEmail();
        Assert.hasText(email, "Email must be given");
        Assert.isTrue(email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"), "Email address " + email + " is not valid.");

        return userRepository.save(user);
    }

    @Override
    public User registerUser(RegisterUserDTO user) {
        User user1 = new User();

        if (user.getAddress() != null) {
            addressService.createAddress(user.getAddress());
        }

        user1.setUserName(user.getUserName());
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setName(user.getName());
        user1.setSurname(user.getSurname());
        user1.setAddress(user.getAddress());

        return userRepository.save(user1);
    }


    /*@Override
    public Korisnik registrirajKorisnika(Korisnik korisnik, String ponovljenaLozinka) {
        Assert.notNull(korisnik, "Korisnik mora biti predan");
        Assert.isNull(korisnik.getIdK(), "Id korisnika mora biti null, predan je " + korisnik.getIdK());

        if (!korisnik.getLozinka().equals(ponovljenaLozinka)) {
            throw new IllegalArgumentException("Lozinke moraju biti iste");
        }

        if (korisnikRepository.countByKIme(korisnik.getkIme()) > 0)
            throw new RequestDeniedException("Korisnicko ime " + korisnik.getkIme() + " vec postoji.");
        return korisnikRepository.save(korisnik);
    }*/

/*
    @Override
    public Optional<Korisnik> findById(Long idK) {
        return korisnikRepository.findById(idK);
    }*/

    @Override
    public Optional<User> findByUserName(String kIme) {
        return userRepository.findByUserName(kIme);
    }

    public void updateUser(String userName, User user) {
        Assert.notNull(user, "Object user must be given");

        Optional<User> u = userRepository.findByUserName(userName);
        User user2 = u.get();


        if (userRepository.countByUserName(user.getUserName()) > 0)
            throw new RequestDeniedException("Username " + user.getUserName() + " already exists.");

        if (userRepository.countByEmail(user.getEmail()) > 0)
            throw new RequestDeniedException("Email address " + user.getEmail() + " is already in use.");

        String email = user.getEmail();
        Assert.hasText(email, "Email must be given");
        Assert.isTrue(email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"), "Email address " + email + " is not valid.");


        user2.setUserName(user.getUserName());
        user2.setEmail(user.getEmail());
        user2.setPassword(user.getPassword());
        user2.setName(user.getName());
        user2.setSurname(user.getSurname());
        user2.setAddress(user.getAddress());

        userRepository.save(user2);
    }
}
