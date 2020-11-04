package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.AdresaRepository;
import hr.fer.progi.stopWaste.domain.Adresa;
import hr.fer.progi.stopWaste.domain.City;
import hr.fer.progi.stopWaste.service.AdresaService;
import hr.fer.progi.stopWaste.service.MjestoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdresaServiceJpa implements AdresaService {

   @Autowired
   private AdresaRepository adresaRepository;

   @Autowired
   private MjestoService mjestoService;


   @Override
   public List<Adresa> listAll() {
      return adresaRepository.findAll();
   }

   @Override
   public Adresa stvoriAdresu(Adresa adresa) {
      if (adresa.getGrad() != null) {
         mjestoService.stvoriMjesto(adresa.getGrad());
      }

      return adresaRepository.save(adresa);
   }

   @Override
   public Adresa stvoriAdresu(String ulica, String kbr, City grad) {
    Adresa novaAdresa = new Adresa();
      novaAdresa.setUlica(ulica);
      novaAdresa.setKbr(kbr);
      novaAdresa.setGrad(grad);

      return adresaRepository.save(novaAdresa);
   }

}
