package hr.fer.progi.stopWaste.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime timeOfAddition;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime timeOfExpiration;

    @NotNull
    @ManyToOne
    private User userSeller;

    @ManyToOne
    private User userBuyer;

    @ManyToOne
    private Condition condition;

}