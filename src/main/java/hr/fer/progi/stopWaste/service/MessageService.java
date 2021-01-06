package hr.fer.progi.stopWaste.service;

import hr.fer.progi.stopWaste.domain.Message;
import hr.fer.progi.stopWaste.rest.dto.request.MessageDTO;

import java.util.List;

public interface MessageService {

    List<Message> getAllMessages(String username);

    void createMessage(MessageDTO dto, String username);
}
