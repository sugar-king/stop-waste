package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Address;
import hr.fer.progi.stopWaste.domain.City;

import java.util.List;

public interface AddressService {

   List<Address> listAll();

   Address createAddress(Address address);

   Address createAddress(String street, String number, City city);

}
