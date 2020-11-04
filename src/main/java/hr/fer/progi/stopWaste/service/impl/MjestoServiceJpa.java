package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.MjestoRepository;
import hr.fer.progi.stopWaste.domain.City;
import hr.fer.progi.stopWaste.service.MjestoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MjestoServiceJpa implements MjestoService {

   @Autowired
   MjestoRepository mjestoRepository;

   @Override
   public List<City> listAll() {
      return mjestoRepository.findAll();
   }

   @Override
   public City stvoriMjesto(City city) {
      return mjestoRepository.save(city);
   }

   @Override
   public City stvoriMjesto(String naziv, String postBroj) {
      City novoMjesto = new City();
      novoMjesto.setNaziv(naziv);
      novoMjesto.setPostBroj(postBroj);

      return mjestoRepository.save(novoMjesto);
   }
}
