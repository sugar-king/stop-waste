package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.City;

import java.util.List;


public interface CityService {

   List<City> listAll();

   City createCity(City city);

   City createCity(String cityName, String postBroj);
}
