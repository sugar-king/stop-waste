package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.AdRepository;
import hr.fer.progi.stopWaste.dao.ConditionRepository;
import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.domain.Condition;
import hr.fer.progi.stopWaste.domain.ECondition;
import hr.fer.progi.stopWaste.rest.dto.response.AdDTO;
import hr.fer.progi.stopWaste.service.AdService;
import hr.fer.progi.stopWaste.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdServiceJpa implements AdService {

   private final AdRepository adRepository;

   private final UserService userService;
   private final ConditionRepository conditionRepository;

   public AdServiceJpa(AdRepository adRepository, UserService userService, ConditionRepository conditionRepository) {
      this.adRepository = adRepository;
      this.userService = userService;
      this.conditionRepository = conditionRepository;
   }

   @Override
   public List<AdDTO> getAllAds() {
      return mapAdToAdDTO(adRepository.findAll());
   }

   private List<AdDTO> mapAdToAdDTO(List<Ad> ads) {
      ModelMapper mapper = new ModelMapper();

      return ads.stream()
              .map((ad -> {
                 AdDTO adDTO = mapper.map(ad, AdDTO.class);
                 adDTO.setUserSeller(ad.getUserSeller().getUsername());
                 adDTO.setSellerAddress(ad.getUserSeller().getAddress());
                 if (ad.getUserBuyer() != null) {
                    adDTO.setUserBuyer(ad.getUserBuyer().getUsername());
                 }
                 return adDTO;
              }))
              .collect(Collectors.toList());
   }


   @Override
   public List<AdDTO> getPostedAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByUserSeller_Username(username));
   }

   @Override
   public List<AdDTO> getSoldAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByCondition_ConditionNameAndUserSeller_Username(ECondition.CONDITION_SOLD, username));
   }

   @Override
   public List<AdDTO> getBoughtAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByCondition_ConditionNameAndUserBuyer_Username(ECondition.CONDITION_SOLD, username));
   }

   @Override
   public List<AdDTO> getReservedAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByCondition_ConditionNameAndUserBuyer_Username(ECondition.CONDITION_RESERVED, username));
   }

   @Override
   public List<AdDTO> getMyAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByUserBuyer_UsernameOrUserSeller_Username(username, username));
   }

   @Override
   public void postAd(Ad ad) {
      ModelMapper mapper = new ModelMapper();
      Ad newAd = mapper.map(ad, Ad.class);
      if (conditionRepository.findByConditionName(ECondition.CONDITION_ACTIVE).isEmpty()) {
         conditionRepository.save(new Condition(ECondition.CONDITION_ACTIVE));
      }
      newAd.setCondition(conditionRepository.findByConditionName(ECondition.CONDITION_ACTIVE).get());
      adRepository.save(newAd);
   }

   @Override
   public List<AdDTO> getActiveAds() {
      return mapAdToAdDTO(adRepository.getAdsByCondition_ConditionName(ECondition.CONDITION_ACTIVE).stream()
              .filter(ad -> ad.getTimeOfExpiration().isBefore(LocalDateTime.now()))
              .collect(Collectors.toList()));

   }
}
