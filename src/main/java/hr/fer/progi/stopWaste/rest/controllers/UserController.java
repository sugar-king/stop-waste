package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.RegisterUserDTO;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<User>> listAll() {
        return ResponseEntity.ok().body(userService.listAll());
    }


   /* @PostMapping("")
    public Korisnik stvoriKorisnika(@RequestBody Korisnik korinik) {
        return korisnikService.stvoriKorisnika(korinik);
    }*/

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterUserDTO dto) {
        return ResponseEntity.created(URI.create("/users/profile/"+dto.getUserName())).body(userService.registerUser(dto));
    }

    /*@PostMapping("")
    public Korisnik registrirajKorisnika(@RequestBody RegistrirajKorisnikaDTO dto) {
        return korisnikService.registrirajKorisnika(dto.getKorisnik(), dto.getPonovljenaLozinka());
    }*/


    /*@GetMapping(path = "{idK}")
    public Optional<Korisnik> dohvatiKorisnikaPoID(@PathVariable("idK") Long idK) {
        return korisnikService.findById(idK);
    }*/

    @GetMapping("/profile/{userName}")
    public ResponseEntity<User> getUser(@PathVariable("userName") String userName) {
       return userService.findByUserName(userName)
               .map(ResponseEntity::ok)
               .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile/update/{userName}")
    public void updateUser(@PathVariable("userName") String userName, @RequestBody User user) {
         userService.updateUser(userName, user);
    }
}
