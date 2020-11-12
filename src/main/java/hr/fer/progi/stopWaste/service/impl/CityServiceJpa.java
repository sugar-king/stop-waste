package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.CityRepository;
import hr.fer.progi.stopWaste.domain.City;
import hr.fer.progi.stopWaste.service.CityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceJpa implements CityService {

   private final CityRepository cityRepository;

   public CityServiceJpa(CityRepository cityRepository) {
      this.cityRepository = cityRepository;
   }

   @Override
   public List<City> listAll() {
      return cityRepository.findAll();
   }

   @Override
   public City createCity(City city) {
      return cityRepository.save(city);
   }

   @Override
   public City createCity(String cityName, String postalCode) {
      City newCity = new City();
      newCity.setCityName(cityName);
      newCity.setPostalCode(postalCode);

      return cityRepository.save(newCity);
   }
}
