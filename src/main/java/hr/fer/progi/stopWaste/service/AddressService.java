package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Address;

import java.util.List;
import java.util.Optional;

public interface AddressService {

   List<Address> listAll();

   Address createAddress(Address address);

   Optional<Address> findAddress(Address address);

}
