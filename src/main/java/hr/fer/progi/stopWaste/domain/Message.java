package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue
    private Long idMessage;

    @NotNull
    private String text;

    @NotNull
    private String time;

    @ManyToOne
    @NotNull
    private User UserRecieved;

    @ManyToOne
    @NotNull
    private User userSent;

}
