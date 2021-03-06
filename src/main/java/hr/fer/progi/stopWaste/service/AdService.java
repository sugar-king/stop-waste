package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.rest.dto.response.AdDTO;

import java.util.List;

public interface AdService {

   List<AdDTO> getAllAds();

   List<AdDTO> getPostedAds(String username);

   List<AdDTO> getSoldAds(String username);

   List<AdDTO> getBoughtAds(String username);

   List<AdDTO> getReservedAds(String username);

   List<AdDTO> getMyAds(String username);

   void postAd(Ad ad);

   List<AdDTO> getActiveAds(String username);

   boolean reserveAd(Long adId, String buyerUsername);

   boolean adSold(Long adId, String sellerUsername);

   boolean cancelReservation(Long adId, String username);

   boolean deleteAd(Long adId, String username);
}
