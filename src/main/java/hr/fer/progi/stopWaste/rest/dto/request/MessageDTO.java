package hr.fer.progi.stopWaste.rest.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Setter
@Getter
public class MessageDTO {

    @NotBlank
    private String username;

    @NotBlank
    private String text;

    @JsonIgnore
    private final LocalDateTime time = LocalDateTime.now();
}
