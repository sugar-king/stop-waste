package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
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

   private final JwtUtils jwtUtils;


   public AdController(AdService adService, UserService userService, JwtUtils jwtUtils) {
      this.adService = adService;
      this.userService = userService;
      this.jwtUtils = jwtUtils;
   }

   @GetMapping("/all")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<?> getAllAds() {
      return ResponseEntity.ok().body(adService.getAllAds());
   }

   @GetMapping("/myAds/posted")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> getPostedAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getPostedAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @GetMapping("/myAds/sold")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> getSoldAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getSoldAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @GetMapping("/myAds/bought")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getBoughtAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getBoughtAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @GetMapping("/myAds/reserved")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getReservedAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getReservedAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @GetMapping("/myAds")
   @PreAuthorize("hasRole('BUYER')")
   public ResponseEntity<?> getMyAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getMyAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @PostMapping("/postAd")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> postAd(@RequestBody Ad ad) {
      adService.postAd(ad);
      return ResponseEntity.ok().build();
   }
}
