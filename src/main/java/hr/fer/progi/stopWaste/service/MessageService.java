package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.rest.dto.request.MessageDTO;
import hr.fer.progi.stopWaste.rest.dto.response.MessageResponseDTO;

import java.util.List;

public interface MessageService {

    List<MessageResponseDTO> getAllMessages(String username);

    void createMessage(MessageDTO dto, String username);
}
