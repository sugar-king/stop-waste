package hr.fer.progi.stopWaste.service.impl;

import hr.fer.progi.stopWaste.dao.AdRepository;
import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.domain.ECondition;
import hr.fer.progi.stopWaste.service.AdService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdServiceJpa implements AdService {

    private final AdRepository adRepository;

    public AdServiceJpa(AdRepository adRepository) {
        this.adRepository = adRepository;
    }

    @Override
    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }

    @Override
    public List<Ad> getPostedAds(String username) {
        return adRepository.getAdByUserSeller_Username(username);
    }

    @Override
    public List<Ad> getSoldAds(String username) {
        return adRepository.getAdByCondition_ConditionNameAndUserSeller_Username(ECondition.CONDITION_SOLD, username);
    }

    @Override
    public List<Ad> getBoughtAds(String username) {
        return adRepository.getAdByCondition_ConditionNameAndUserBuyer_Username(ECondition.CONDITION_SOLD, username);    }

    @Override
    public List<Ad> getReservedAds(String username) {
        return adRepository.getAdByCondition_ConditionNameAndUserBuyer_Username(ECondition.CONDITION_RESERVED, username);    }

    @Override
    public List<Ad> getMyAds(String username) {
        return adRepository.getAdByCondition_ConditionNameAndUserBuyer_Username(ECondition.CONDITION_SOLD, username);
    }

    @Override
    public void postAd(Ad ad) {
        adRepository.save(ad);
    }
}
