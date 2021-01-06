package hr.fer.progi.stopWaste.service.impl;


import hr.fer.progi.stopWaste.dao.MessageRepository;
import hr.fer.progi.stopWaste.domain.Message;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.MessageDTO;
import hr.fer.progi.stopWaste.service.MessageService;
import hr.fer.progi.stopWaste.service.RequestDeniedException;
import hr.fer.progi.stopWaste.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceJpa  implements MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;

    public MessageServiceJpa(MessageRepository messageRepository, UserService userService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    @Override
    public List<Message> getAllMessages(String username) {
        return messageRepository.getMessageByUserSent_Username(username);
    }
    @Override
    public void createMessage(MessageDTO dto, String username) {
        if(!userService.existsByUsername(username)) {
            throw new RequestDeniedException("Username " + username + " don't exist.");
        }

        User userSent = userService.findByUsername(username).get();
        User userReceived = userService.findByUsername(dto.getUsername()).get();

        String text = dto.getText();
        LocalDateTime time = dto.getTime();

        Message message = new Message();
        message.setText(text);
        message.setTime(time);
        message.setUserReceived(userReceived);
        message.setUserSent(userSent);

        messageRepository.save(message);
    }
}
