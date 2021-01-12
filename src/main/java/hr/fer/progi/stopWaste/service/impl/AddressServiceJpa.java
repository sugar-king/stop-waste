package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.AddressRepository;
import hr.fer.progi.stopWaste.domain.Address;
import hr.fer.progi.stopWaste.service.AddressService;
import hr.fer.progi.stopWaste.service.CityService;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

      if (findAddress(address).isEmpty()) {
         return addressRepository.save(address);
      } else {
         return findAddress(address).get();
      }
   }


   @Override
   public Optional<Address> findAddress(Address address) {
      return addressRepository.findOne(Example.of(address));
   }
}
