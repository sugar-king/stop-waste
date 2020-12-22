package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ads")
public class Ad {

    @Id
    @GeneratedValue
    private Long idAddress;

    @NotNull
    private String caption;

    @Lob
    //@Column(name="imagine")
    private byte[] imagine;
    // Ovo sam našao za unos slika u bazu, pa možda pomogne
    //https://stackoverflow.com/questions/52114455/store-pictures-in-h2-database-spring-boot-thymleaf/52213627

    @NotNull
    private String description;

    @NotNull
    private double price;

    @NotNull
    private double discount;

    // https://stackoverflow.com/questions/28069091/store-datetime-column-in-h2-database-by-hibernate
    //Nisam znao kako to namjestiti pa sam stavio samo string za pocetak
    @NotNull
    private LocalDateTime timeOfAddition;

    @NotNull
    private LocalDateTime timeOfExpiration;

    @ManyToOne
    @NotNull
    private User userSeller;

    @ManyToOne
    private User userBuyer;

    @ManyToOne
    @NotNull
    private Condition condition;


    private boolean sold;
}