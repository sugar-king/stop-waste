package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public String allAccess() {
        System.out.println("He");
        return "Public Content.";
    }
    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping("")
    public ResponseEntity<List<User>> listAll() {
        return ResponseEntity.ok().body(userService.listAll());
    }


   /* @PostMapping("")
    public Korisnik stvoriKorisnika(@RequestBody Korisnik korinik) {
        return korisnikService.stvoriKorisnika(korinik);
    }*/

    /*@PostMapping("")
    public Korisnik registrirajKorisnika(@RequestBody RegistrirajKorisnikaDTO dto) {
        return korisnikService.registrirajKorisnika(dto.getKorisnik(), dto.getPonovljenaLozinka());
    }*/


    /*@GetMapping(path = "{idK}")
    public Optional<Korisnik> dohvatiKorisnikaPoID(@PathVariable("idK") Long idK) {
        return korisnikService.findById(idK);
    }*/

    @GetMapping("/profile/{userName}")
    public ResponseEntity<User> getUser(@PathVariable("userName") String username) {
       return userService.findByUsername(username)
               .map(ResponseEntity::ok)
               .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile/update/{userName}")
    public void updateUser(@PathVariable("userName") String userName, @RequestBody User user) {
         userService.updateUser(userName, user);
    }
}
