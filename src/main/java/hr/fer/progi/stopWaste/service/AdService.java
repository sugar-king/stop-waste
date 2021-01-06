package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Ad;

import java.util.List;

public interface AdService {

    List<Ad> getAllAds();

    List<Ad> getPostedAds(String username);

    List<Ad> getSoldAds(String username);

    List<Ad> getBoughtAds(String username);

    List<Ad> getReservedAds(String username);

    List<Ad> getMyAds(String username);

    void postAd(Ad ad);
}
