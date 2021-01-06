package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Setter
@Getter
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue
    private Long idMessage;

    @NotNull
    private String text;

    @NotNull
    private LocalDateTime time;

    @ManyToOne
    @NotNull
    private User UserReceived;

    @ManyToOne
    @NotNull
    private User userSent;

}
