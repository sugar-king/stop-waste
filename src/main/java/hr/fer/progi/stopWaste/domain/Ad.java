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
    private Long idAd;

    @NotNull
    private String caption;

    @Lob
    private byte[] image;

    @NotNull
    private String description;

    @NotNull
    private double price;

    @NotNull
    private double discount;

    private LocalDateTime timeOfAddition;

    private LocalDateTime timeOfExpiration;

    @NotNull
    @ManyToOne
    private User userSeller;

    @ManyToOne
    private User userBuyer;

    @Enumerated(EnumType.STRING)
    private ECondition condition;

    @ManyToOne
    private Category category;

}