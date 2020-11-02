package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.KorisnikRepository;
import hr.fer.progi.stopWaste.domain.Korisnik;
import hr.fer.progi.stopWaste.rest.RegistrirajKorisnikaDTO;
import hr.fer.progi.stopWaste.service.AdresaService;
import hr.fer.progi.stopWaste.service.KorisnikService;
import hr.fer.progi.stopWaste.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepository;

    @Autowired
    private AdresaService adresaService;

    @Override
    public List<Korisnik> listAll() {
        return korisnikRepository.findAll();
    }

   /* @Override
    public Korisnik stvoriKorisnika(Korisnik korisnik) {
        Assert.notNull(korisnik, "Objekt korisnik mora biti predan");
        Assert.isNull(korisnik.getIdK(), "Id korisnika mora biti null, a ne " + korisnik.getIdK());
        if (korisnikRepository.countBykIme(korisnik.getkIme()) > 0)
            throw new RequestDeniedException("Korisnicko ime " + korisnik.getkIme() + " vec postoji.");
        return korisnikRepository.save(korisnik);
    }*/

    @Override
    public Korisnik stvoriKorisnika(Korisnik korisnik) {
        Assert.notNull(korisnik, "Objekt korisnik mora biti predan");
        Assert.isNull(korisnik.getIdK(), "Id korisnika mora biti null, a ne " + korisnik.getIdK());

        if (korisnikRepository.countBykIme(korisnik.getkIme()) > 0)
            throw new RequestDeniedException("Korisnicko ime " + korisnik.getkIme() + " vec postoji.");

        if (korisnikRepository.countByEmail(korisnik.getEmail()) > 0)
            throw new RequestDeniedException("Email adresa " + korisnik.getEmail() + " se vec koristi");

        String email = korisnik.getEmail();
        Assert.hasText(email, "Email mora biti predan");
        Assert.isTrue(email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"), "Email adresa nije valjana");

        return korisnikRepository.save(korisnik);
    }

    @Override
    public Korisnik stvoriKorisnika(RegistrirajKorisnikaDTO korisnik) {
        Korisnik korisnik1 = new Korisnik();

        if (korisnik.getAdresa() != null) {
            adresaService.stvoriAdresu(korisnik.getAdresa());
        }


        korisnik1.setkIme(korisnik.getkIme());
        korisnik1.setEmail(korisnik.getEmail());
        korisnik1.setLozinka(korisnik.getLozinka());
        korisnik1.setIme(korisnik.getIme());
        korisnik1.setPrezime(korisnik.getPrezime());
        korisnik1.setAdresa(korisnik.getAdresa());



        return korisnikRepository.save(korisnik1);
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


}
