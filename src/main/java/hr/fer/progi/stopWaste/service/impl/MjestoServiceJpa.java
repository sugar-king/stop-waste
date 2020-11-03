package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.MjestoRepository;
import hr.fer.progi.stopWaste.domain.Mjesto;
import hr.fer.progi.stopWaste.service.MjestoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MjestoServiceJpa implements MjestoService {

   @Autowired
   MjestoRepository mjestoRepository;

   @Override
   public List<Mjesto> listAll() {
      return mjestoRepository.findAll();
   }

   @Override
   public Mjesto stvoriMjesto(Mjesto mjesto) {
      return mjestoRepository.save(mjesto);
   }

   @Override
   public Mjesto stvoriMjesto(String naziv, String postBroj) {
      Mjesto novoMjesto = new Mjesto();
      novoMjesto.setNaziv(naziv);
      novoMjesto.setPostBroj(postBroj);

      return mjestoRepository.save(novoMjesto);
   }
}
