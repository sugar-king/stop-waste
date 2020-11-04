package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.City;

import java.util.List;


public interface MjestoService {

   List<City> listAll();

   City stvoriMjesto(City city);

   City stvoriMjesto(String naziv, String postBroj);
}
