package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;


import javax.persistence.*;



@Entity
public class User {

   @Id
   @GeneratedValue
   private Long IdUser;

   @Column(unique = true, nullable = false)
   private String UserName;

   @Column(unique = true, nullable = false)
   private String email;

   @NotNull
   private String password;

   @NotNull
   private String name;

   private String surname;

   @ManyToOne
   private Address address;


   public Long getIdUser() {
      return IdUser;
   }

   public void setIdUser(Long idUser) {
      IdUser = idUser;
   }

   public String getUserName() {
      return UserName;
   }

   public void setUserName(String userName) {
      UserName = userName;
   }

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getPassword() {
      return password;
   }

   public void setPassword(String password) {
      this.password = password;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getSurname() {
      return surname;
   }

   public void setSurname(String surname) {
      this.surname = surname;
   }

   public Address getAddress() {
      return address;
   }

   public void setAddress(Address address) {
      this.address = address;
   }

   @Override
   public String toString() {
      return "User{" +
              "IdUser=" + IdUser +
              ", UserName='" + UserName + '\'' +
              ", email='" + email + '\'' +
              ", password='" + password + '\'' +
              ", name='" + name + '\'' +
              ", surname='" + surname + '\'' +
              ", address=" + address +
              '}';
   }
}
