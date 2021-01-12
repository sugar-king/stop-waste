package hr.fer.progi.stopWaste.rest.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import hr.fer.progi.stopWaste.domain.Ad;
import hr.fer.progi.stopWaste.rest.dto.response.InfoResponse;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.service.AdService;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/offers")
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
   public ResponseEntity<?> getAllAds() {
      return ResponseEntity.ok().body(adService.getAllAds());
   }

   @GetMapping("")
   //@PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public ResponseEntity<?> getActiveAds() {
      return ResponseEntity.ok(adService.getActiveAds());
   }

   @GetMapping("/myOffers/posted")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> getPostedAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getPostedAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @GetMapping("/myOffers/sold")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> getSoldAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getSoldAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @GetMapping("/myOffers/bought")
   @PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public ResponseEntity<?> getBoughtAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getBoughtAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @GetMapping("/myOffers/reserved")
   @PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public ResponseEntity<?> getReservedAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getReservedAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @GetMapping("/myOffers")
   @PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public ResponseEntity<?> getMyAds(@RequestHeader(name = "Authorization") String token) {
      if (userService.findByJwtToken(token).isPresent()) {
         return ResponseEntity.ok(adService.getMyAds(jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @PostMapping("/postAd")
   @PreAuthorize("hasRole('SELLER')")
   public ResponseEntity<?> postAd(@RequestParam("model") String model,
                                   @RequestParam(value = "file", required = false) MultipartFile file,
                                   @RequestHeader(name = "Authorization") String token) throws IOException {
      ObjectMapper mapper = new ObjectMapper();
      mapper.registerModule(new JavaTimeModule());



      Ad newAd = mapper.readValue(model, Ad.class);
      newAd.setImage(file.getBytes());
      newAd.setUserSeller(userService.findByUsername(jwtUtils.getUserNameFromJwtToken(token)).get());
      adService.postAd(newAd);
      return ResponseEntity.ok().build();
   }

   @PostMapping("/reserveAd/{adId}")
   @PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public ResponseEntity<?> reserveAd(@PathVariable("adId") Long adId, @RequestHeader(name = "Authorization") String token) {
      if (adService.reserveAd(adId, jwtUtils.getUserNameFromJwtToken(token))) {
         return ResponseEntity.ok(new InfoResponse("Reserved ad " + adId + "by user " + jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.badRequest().body("Failed to reserve ad.");
      }
   }

   @PostMapping("/cancelReservation/{adId}")
   @PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public ResponseEntity<?> cancelReservation(@PathVariable("adId") Long adId, @RequestHeader(name = "Authorization") String token) {
      if (adService.cancelReservation(adId, jwtUtils.getUserNameFromJwtToken(token))) {
         return ResponseEntity.ok(new InfoResponse("Canceled reservation for ad " + adId + "by user " + jwtUtils.getUserNameFromJwtToken(token)));
      } else {
         return ResponseEntity.badRequest().body("Failed to reserve ad.");
      }
   }

   @PostMapping("/adSold/{adId}")
   @PreAuthorize("hasAnyRole('SELLER')")
   public ResponseEntity<?> adSold(@PathVariable("adId") Long adId, @RequestHeader(name = "Authorization") String token) {
      if (adService.adSold(adId, jwtUtils.getUserNameFromJwtToken(token))) {
         return ResponseEntity.ok(new InfoResponse("Ad " + adId + " sold"));
      } else {
         return ResponseEntity.badRequest().body("Failed to set ad as sold.");
      }
   }
}
