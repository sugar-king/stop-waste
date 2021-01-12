package hr.fer.progi.stopWaste.rest.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import hr.fer.progi.stopWaste.domain.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NewAdDTO {


   private Long idAd;

   @NotNull
   private String caption;

   private byte[] image;

   @NotNull
   private String description;

   @NotNull
   private double price;

   @NotNull
   private double discount;

   @JsonFormat(pattern = "yyyy-MM-DD'T'HH:mm")
   private LocalDateTime timeOfAddition;

   @JsonFormat(pattern = "yyyy-MM-DD'T'HH:mm")
   private LocalDateTime timeOfExpiration;

   private String userSellerUsername;

   private Category category;
}