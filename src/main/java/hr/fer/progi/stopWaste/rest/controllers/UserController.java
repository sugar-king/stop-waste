package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.RegisterUserDTO;
import hr.fer.progi.stopWaste.service.AddressService;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AddressService addressService;

    @GetMapping("")
    public List<User> listAll() {
        return userService.listAll();
    }


   /* @PostMapping("")
    public Korisnik stvoriKorisnika(@RequestBody Korisnik korinik) {
        return korisnikService.stvoriKorisnika(korinik);
    }*/

    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterUserDTO dto) {
        return userService.registerUser(dto);
    }

    /*@PostMapping("")
    public Korisnik registrirajKorisnika(@RequestBody RegistrirajKorisnikaDTO dto) {
        return korisnikService.registrirajKorisnika(dto.getKorisnik(), dto.getPonovljenaLozinka());
    }*/


    /*@GetMapping(path = "{idK}")
    public Optional<Korisnik> dohvatiKorisnikaPoID(@PathVariable("idK") Long idK) {
        return korisnikService.findById(idK);
    }*/

    @GetMapping("/profil/{userName}")
    public Optional<User> getUser(@PathVariable("userName") String userName) {
        return userService.findByUserName(userName);
    }

    @PutMapping("/profil/update/{userName}")
    public void updateUser(@PathVariable("userName") String userName, @RequestBody User user) {
        userService.updateUser(userName, user);
    }
}
