package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
