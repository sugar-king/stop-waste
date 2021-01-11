package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "adInCategory")
public class AdInCategory {

    @Id
    @GeneratedValue
    private Long idUsersPrefersCategory;

    @ManyToOne
    @NotNull
    private Ad ads;

    @ManyToOne
    @NotNull
    private Category categories;
}
