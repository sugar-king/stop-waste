package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.HashSet;
import java.util.Set;


@Setter
@Getter
@Entity
//@Table(name = "users")
public class User {

   @Id
   @GeneratedValue
   private Long idUser;

   @Column(unique = true, nullable = false)
   private String username;

   @Column(unique = true, nullable = false)
   @Email
   private String email;

   @NotNull
   private String password;

   @NotNull
   private String name;

   private String surname;

   @ManyToOne
   private Address address;

   @ManyToMany(fetch = FetchType.LAZY)
   @JoinTable(name = "user_roles",
           joinColumns = @JoinColumn(name = "user_id"),
           inverseJoinColumns = @JoinColumn(name = "role_id"))
   private Set<Role> roles = new HashSet<>();

   public User(){}

   public User(String username, String email, String password, String name, String surname) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.name = name;
      this.surname = surname;
   }

   @Override
   public String toString() {
      return "User{" +
              "IdUser=" + idUser +
              ", username='" + username + '\'' +
              ", email='" + email + '\'' +
              ", password='" + password + '\'' +
              ", name='" + name + '\'' +
              ", surname='" + surname + '\'' +
              ", address=" + address +
              '}';
   }
}
