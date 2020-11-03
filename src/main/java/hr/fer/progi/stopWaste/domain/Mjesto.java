package hr.fer.progi.stopWaste.domain;


import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Mjesto {

   @Id
   private String naziv;

   @Column(unique = true, nullable = false)
   @NotNull
   //@Size(min=5, max=5)
   private String postBroj;

   public String getNaziv() {
      return naziv;
   }

   public void setNaziv(String naziv) {
      this.naziv = naziv;
   }

   public String getPostBroj() {
      return postBroj;
   }

   public void setPostBroj(String postBroj) {
      this.postBroj = postBroj;
   }

}
