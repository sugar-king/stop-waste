package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "addresses")
public class Address {

   @Id
   @GeneratedValue
   private Long idAddress;

   @NotNull
   private String street;

   @NotNull
   private String number;

   @ManyToOne
   @NotNull
   private City city;
}
