package hr.fer.progi.stopWaste.rest;

import hr.fer.progi.stopWaste.domain.Korisnik;
import hr.fer.progi.stopWaste.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/korisnici")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;

    @GetMapping("")
    public List<Korisnik> listAll() {
        return korisnikService.listAll();
    }

   /* @PostMapping("")
    public Korisnik stvoriKorisnika(@RequestBody Korisnik korinik) {
        return korisnikService.stvoriKorisnika(korinik);
    }*/

    @PostMapping("/registracija")
    public Korisnik stvoriKorisnika(@RequestBody RegistrirajKorisnikaDTO dto) {
        return korisnikService.stvoriKorisnika(dto.getKorisnik(), dto.getPonovljenaLozinka());
    }

    /*@PostMapping("")
    public Korisnik registrirajKorisnika(@RequestBody RegistrirajKorisnikaDTO dto) {
        return korisnikService.registrirajKorisnika(dto.getKorisnik(), dto.getPonovljenaLozinka());
    }*/
}
