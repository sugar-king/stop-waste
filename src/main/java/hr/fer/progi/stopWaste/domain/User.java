package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;



@Setter
@Getter
@Entity
public class User {

   @Id
   @GeneratedValue
   private Long idUser;

   @Column(unique = true, nullable = false)
   private String userName;

   @Column(unique = true, nullable = false)
   private String email;

   @NotNull
   private String password;

   @NotNull
   private String name;

   private String surname;

   @ManyToOne
   private Address address;


   /*public Long getIdUser() {
      return idUser;
   }

   public void setIdUser(Long idUser) {
      this.idUser = idUser;
   }

   public String getUserName() {
      return userName;
   }

   public void setUserName(String userName) {
      this.userName = userName;
   }
*/
   @Override
   public String toString() {
      return "User{" +
              "IdUser=" + idUser +
              ", UserName='" + userName + '\'' +
              ", email='" + email + '\'' +
              ", password='" + password + '\'' +
              ", name='" + name + '\'' +
              ", surname='" + surname + '\'' +
              ", address=" + address +
              '}';
   }
}
