package hr.fer.progi.stopWaste.domain;


import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Setter
@Getter
@Entity
@Table(name="cities")
public class City {

   @Id
   private String cityName;

   @NotNull
   private String postalCode;
}
