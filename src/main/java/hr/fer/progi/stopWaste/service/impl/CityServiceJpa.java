package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.CityRepository;
import hr.fer.progi.stopWaste.domain.City;
import hr.fer.progi.stopWaste.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceJpa implements CityService {

   @Autowired
   CityRepository cityRepository;

   @Override
   public List<City> listAll() {
      return cityRepository.findAll();
   }

   @Override
   public City createCity(City city) {
      return cityRepository.save(city);
   }

   @Override
   public City createCity(String cityName, String idCity) {
      City newCity = new City();
      newCity.setCityName(cityName);
      newCity.setIdCity(idCity);

      return cityRepository.save(newCity);
   }
}
