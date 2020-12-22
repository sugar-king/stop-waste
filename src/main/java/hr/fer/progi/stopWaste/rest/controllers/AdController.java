package hr.fer.progi.stopWaste.rest.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/ads")
public class AdController {

   @GetMapping("/all")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<?> getAllAds() {
      return null;
   }

   @GetMapping("/myAds/posted")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> getPostedAds() {
      return null;
   }

   @GetMapping("/myAds/sold")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> getSoldAds() {
      return null;
   }

   @GetMapping("/myAds/bought")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getBoughtAds() {
      return null;
   }
   @GetMapping("/myAds/reserved")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getReservedAds() {
      return null;
   }

   @GetMapping("/myAds")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getMyAds() {
      return null;
   }

   @PostMapping("/postAd")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> postAd() {
      return  null;
   }
}
