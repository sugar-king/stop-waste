package hr.fer.progi.stopWaste.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Data
public class Role {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer idRole;

   @Enumerated(EnumType.STRING)
   @Column(length = 20)
   private ERole name;

   public Role() {}
}
