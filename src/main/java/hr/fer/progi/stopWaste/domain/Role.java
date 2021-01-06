package hr.fer.progi.stopWaste.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

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

   @Override
   public boolean equals(Object o) {
      if (this == o) {
         return true;
      }
      if (o == null || getClass() != o.getClass()) {
         return false;
      }

      Role role = (Role) o;

      if (!Objects.equals(idRole, role.idRole)) {
         return false;
      }
      return name == role.name;
   }

   @Override
   public int hashCode() {
      int result = idRole != null ? idRole.hashCode() : 0;
      result = 31 * result + (name != null ? name.hashCode() : 0);
      return result;
   }
}
