package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Adresa;
import hr.fer.progi.stopWaste.domain.City;

import java.util.List;

public interface AdresaService {

   List<Adresa> listAll();

   Adresa stvoriAdresu(Adresa adresa);

   Adresa stvoriAdresu(String ulica, String kbr, City grad);

}
