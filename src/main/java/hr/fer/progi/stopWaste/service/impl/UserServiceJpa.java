package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.UserRepository;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.RegisterUserDTO;
import hr.fer.progi.stopWaste.service.AddressService;
import hr.fer.progi.stopWaste.service.RequestDeniedException;
import hr.fer.progi.stopWaste.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceJpa implements UserService {

    private final UserRepository userRepository;

    private final AddressService addressService;

    public UserServiceJpa(UserRepository userRepository, AddressService addressService) {
        this.userRepository = userRepository;
        this.addressService = addressService;
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

        checkUserName(user.getUserName());
        checkEmail(user.getEmail());

        return userRepository.save(user);
    }

    @Override
    public User registerUser(RegisterUserDTO user) {

        if (user.getAddress() != null) {
            addressService.createAddress(user.getAddress());
        }

        checkUserName(user.getUserName());
        checkEmail(user.getEmail());

        ModelMapper mapper = new ModelMapper();

        User user1 = mapper.map(user, User.class);

        return userRepository.save(user1);
    }

    private void checkUserName(String userName) {
        if (userRepository.existsByEmail(userName))
            throw new RequestDeniedException("Username " + userName + " already exists.");
    }

    private void checkEmail(String email) {
        if (userRepository.existsByEmail(email))
            throw new RequestDeniedException("Email address " + email + " is already in use.");

        Assert.hasText(email, "Email must be given");
        Assert.isTrue(email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"), "Email address " + email + " is not valid.");
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


        if (!user.getUserName().equals(user2.getUserName()) && userRepository.existsByEmail(user.getUserName()))
            throw new RequestDeniedException("Username " + user.getUserName() + " already exists.");

        if (!user.getEmail().equals(user2.getEmail()) && userRepository.existsByEmail(user.getEmail()))
            throw new RequestDeniedException("Email address " + user.getEmail() + " is already in use.");

        String email = user.getEmail();
        Assert.hasText(email, "Email must be given");
        Assert.isTrue(email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"), "Email address " + email + " is not valid.");

        if (user.getAddress() != null) {
            addressService.createAddress(user.getAddress());
        }

        ModelMapper mapper = new ModelMapper();

        user2 = mapper.map(user, User.class);
        user2.setIdUser(u.get().getIdUser());
        userRepository.save(user2);
    }
}
