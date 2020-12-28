package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.service.AdService;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/ads")
public class AdController {

   private final AdService adService;

   private final UserService userService;

   public AdController(AdService adService, UserService userService) {
      this.adService = adService;
      this.userService = userService;
   }

   @GetMapping("/all")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<?> getAllAds() {
      return ResponseEntity.ok().body(adService.getAllAds());
   }

   @GetMapping("/myAds/posted/{username}")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> getPostedAds(@PathVariable("username") String username) {
      if (userService.findByUsername(username).isPresent())
         return ResponseEntity.ok(adService.getPostedAds(username));
      else
         return ResponseEntity.notFound().build();
   }

   @GetMapping("/myAds/sold/{username}")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> getSoldAds(@PathVariable("username") String username) {
      if (userService.findByUsername(username).isPresent())
         return ResponseEntity.ok(adService.getSoldAds(username));
      else
         return ResponseEntity.notFound().build();
   }

   @GetMapping("/myAds/bought/{username}")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getBoughtAds(@PathVariable("username") String username) {
      if (userService.findByUsername(username).isPresent())
         return ResponseEntity.ok(adService.getBoughtAds(username));
      else
         return ResponseEntity.notFound().build();   }
   @GetMapping("/myAds/reserved/{username}")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getReservedAds(@PathVariable("username") String username) {
      if (userService.findByUsername(username).isPresent())
         return ResponseEntity.ok(adService.getReservedAds(username));
      else
         return ResponseEntity.notFound().build();   }

   @GetMapping("/myAds/{username}")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getMyAds(@PathVariable("username") String username) {
      if (userService.findByUsername(username).isPresent())
         return ResponseEntity.ok(adService.getMyAds(username));
      else
         return ResponseEntity.notFound().build();   }

   @PostMapping("/postAd")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> postAd(@RequestBody Ad ad) {
      adService.postAd(ad);
      return ResponseEntity.ok().build();
   }
}
