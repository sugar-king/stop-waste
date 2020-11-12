package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(name = "Authorization") String token) {
        return userService.findByJwtToken(token)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> listAll() {
        return ResponseEntity.ok().body(userService.listAll());
    }


    @GetMapping("/profile/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
       return userService.findByUsername(username)
               .map(ResponseEntity::ok)
               .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile/update/{username}")
    public void updateUser(@PathVariable("username") String username, @RequestBody User user) {
         userService.updateUser(username, user);
    }
}
