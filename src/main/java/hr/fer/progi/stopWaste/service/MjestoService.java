package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Korisnik;
import hr.fer.progi.stopWaste.domain.Mjesto;
import hr.fer.progi.stopWaste.rest.RegistrirajKorisnikaDTO;

import java.util.List;


public interface MjestoService {

   List<Mjesto> listAll();

   Mjesto stvoriMjesto(Mjesto mjesto);

   Mjesto stvoriMjesto(String naziv, String postBroj);
}
