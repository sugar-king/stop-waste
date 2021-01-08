package hr.fer.progi.stopWaste.rest.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Setter
@Getter
public class MessageDTO {

    private String usernameReceiver;

    @NotBlank
    private String text;

    private final LocalDateTime time = LocalDateTime.now();
}
