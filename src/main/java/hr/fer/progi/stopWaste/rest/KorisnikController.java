package hr.fer.progi.stopWaste.rest;

import hr.fer.progi.stopWaste.domain.Korisnik;
import hr.fer.progi.stopWaste.service.AdresaService;
import hr.fer.progi.stopWaste.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
<<<<<<< HEAD
=======
import java.util.Optional;
>>>>>>> origin/controllers

@RestController
@RequestMapping("/korisnici")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;
    @Autowired
    private AdresaService adresaService;

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
        return korisnikService.stvoriKorisnika(dto);
    }

    /*@PostMapping("")
    public Korisnik registrirajKorisnika(@RequestBody RegistrirajKorisnikaDTO dto) {
        return korisnikService.registrirajKorisnika(dto.getKorisnik(), dto.getPonovljenaLozinka());
    }*/
<<<<<<< HEAD
=======


    /*@GetMapping(path = "{idK}")
    public Optional<Korisnik> dohvatiKorisnikaPoID(@PathVariable("idK") Long idK) {
        return korisnikService.findById(idK);
    }*/

    @GetMapping("/profil/{kIme}")
    public Optional<Korisnik> dohvatiKorisnika(@PathVariable("kIme") String kIme) {
        return korisnikService.findBykIme(kIme);
    }

    @PutMapping("/profil/izmjene/{kIme}")
    public void izmjenaKorisnika(@PathVariable("kIme") String kIme,@RequestBody Korisnik korisnik) {
        korisnikService.izmjenaKorisnika(kIme, korisnik);
    }
>>>>>>> origin/controllers
}
