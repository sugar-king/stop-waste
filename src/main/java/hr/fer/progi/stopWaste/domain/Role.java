package hr.fer.progi.stopWaste.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "roles")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Role {
   public Role(ERole name) {
      this.name = name;
   }

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer idRole;

   @EqualsAndHashCode.Include()
   @Enumerated(EnumType.STRING)
   private ERole name;

}
