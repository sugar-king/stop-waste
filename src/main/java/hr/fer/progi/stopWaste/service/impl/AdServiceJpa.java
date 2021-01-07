package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.AdRepository;
import hr.fer.progi.stopWaste.dao.ConditionRepository;
import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.domain.Condition;
import hr.fer.progi.stopWaste.domain.ECondition;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.response.AdDTO;
import hr.fer.progi.stopWaste.service.AdService;
import hr.fer.progi.stopWaste.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
   @Transactional
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


   @Transactional
   @Override
   public List<AdDTO> getPostedAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByUserSeller_Username(username));
   }

   @Transactional
   @Override
   public List<AdDTO> getSoldAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByCondition_ConditionNameAndUserSeller_Username(ECondition.CONDITION_SOLD, username));
   }

   @Transactional
   @Override
   public List<AdDTO> getBoughtAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByCondition_ConditionNameAndUserBuyer_Username(ECondition.CONDITION_SOLD, username));
   }

   @Transactional
   @Override
   public List<AdDTO> getReservedAds(String username) {
      return mapAdToAdDTO(adRepository.getAdsByCondition_ConditionNameAndUserBuyer_Username(ECondition.CONDITION_RESERVED, username));
   }

   @Transactional
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

   @Transactional
   @Override
   public List<AdDTO> getActiveAds() {
      return mapAdToAdDTO(adRepository.getAdsByCondition_ConditionName(ECondition.CONDITION_ACTIVE).stream()
              .filter(ad -> ad.getTimeOfExpiration().isBefore(LocalDateTime.now()))
              .collect(Collectors.toList()));

   }

   @Override
   public boolean reserveAd(Long adId, String buyerUsername) {
      Optional<Ad> adOptional = adRepository.getAdByIdAd(adId);
      Optional<User> userOptional = userService.findByUsername(buyerUsername);
      if (adOptional.isEmpty() || userOptional.isEmpty()) {
         return false;
      }
      Ad ad = adOptional.get();
      User user = userOptional.get();

      if (conditionRepository.findByConditionName(ECondition.CONDITION_RESERVED).isEmpty()) {
         conditionRepository.save(new Condition(ECondition.CONDITION_RESERVED));
      }
      ad.setCondition(conditionRepository.findByConditionName(ECondition.CONDITION_RESERVED).get());
      ad.setUserBuyer(user);

      adRepository.save(ad);
      return true;
   }

   @Override
   public boolean adSold(Long adId, String sellerUsername) {
      Optional<Ad> adOptional = adRepository.getAdByIdAd(adId);
      if (adOptional.isEmpty()) {
         return false;
      }
      Ad ad = adOptional.get();
      if (!ad.getUserSeller().getUsername().equals(sellerUsername)) {
         return false;
      }
      if (conditionRepository.findByConditionName(ECondition.CONDITION_SOLD).isEmpty()) {
         conditionRepository.save(new Condition(ECondition.CONDITION_SOLD));
      }
      ad.setCondition(conditionRepository.findByConditionName(ECondition.CONDITION_SOLD).get());

      adRepository.save(ad);
      return true;
   }


}
