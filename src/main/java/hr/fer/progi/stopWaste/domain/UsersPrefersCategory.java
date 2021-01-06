package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "usersPrefersCategories")
public class UsersPrefersCategory {

    @Id
    @GeneratedValue
    private Long idUsersPrefersCategory;

    @ManyToOne
    @NotNull
    private User users;

    @ManyToOne
    @NotNull
    private Category categories;

}
