package hr.fer.progi.stopWaste.rest.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import hr.fer.progi.stopWaste.domain.Address;
import hr.fer.progi.stopWaste.domain.Category;
import hr.fer.progi.stopWaste.domain.ECondition;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdDTO {

   private Long idAd;

   private String caption;

   private byte[] image;

   private String description;

   private double price;

   private double discount;

   @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
   private LocalDateTime timeOfAddition;

   @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
   private LocalDateTime timeOfExpiration;

   @NotNull
   private String userSeller;

   private String userBuyer;

   private Address sellerAddress;

   private ECondition condition;

   private Category category;
}
