package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.AddressRepository;
import hr.fer.progi.stopWaste.domain.Address;
import hr.fer.progi.stopWaste.domain.City;
import hr.fer.progi.stopWaste.service.AddressService;
import hr.fer.progi.stopWaste.service.CityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceJpa implements AddressService {

   private final AddressRepository addressRepository;

   private final CityService cityService;

   public AddressServiceJpa(AddressRepository addressRepository, CityService cityService) {
      this.addressRepository = addressRepository;
      this.cityService = cityService;
   }


   @Override
   public List<Address> listAll() {
      return addressRepository.findAll();
   }

   public Address createAddress(Address address) {
      if (address.getCity() != null) {
         cityService.createCity(address.getCity());
      }

      return addressRepository.save(address);
   }

   @Override
   public Address createAddress(String street, String number, City city) {
       Address newAddress = new Address();
       newAddress.setStreet(street);
       newAddress.setNumber(number);
       newAddress.setCity(city);

      return addressRepository.save(newAddress);
   }

}
