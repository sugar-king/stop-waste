package hr.fer.progi.stopWaste.service.impl;


import hr.fer.progi.stopWaste.dao.MessageRepository;
import hr.fer.progi.stopWaste.domain.Message;
import hr.fer.progi.stopWaste.domain.User;
import hr.fer.progi.stopWaste.rest.dto.request.MessageDTO;
import hr.fer.progi.stopWaste.rest.dto.response.MessageResponseDTO;
import hr.fer.progi.stopWaste.service.MessageService;
import hr.fer.progi.stopWaste.service.RequestDeniedException;
import hr.fer.progi.stopWaste.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageServiceJpa  implements MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;

    public MessageServiceJpa(MessageRepository messageRepository, UserService userService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    @Override
    public List<MessageResponseDTO> getAllMessages(String username) {
        return mapMessages(messageRepository.getMessagesByUserReceived_UsernameOrUserSent_Username(username, username));
    }

    private List<MessageResponseDTO> mapMessages(List<Message> messages) {
        ModelMapper mapper = new ModelMapper();
        return messages.stream()
                .map((m) -> {
                    MessageResponseDTO dto = mapper.map(m, MessageResponseDTO.class);
                    dto.setUsernameReceived(m.getUserReceived().getUsername());
                    dto.setUsernameSent(m.getUserSent().getUsername());
                    return dto;
                }).collect(Collectors.toList());
    }
    @Override
    public void createMessage(MessageDTO dto, String username) {
        Optional<User> userOptional = userService.findByUsername(username);
        if(userOptional.isEmpty()) {
            throw new RequestDeniedException("Username " + username + " doesn't exist.");
        }

        User userSent = userOptional.get();
        User userReceived = userService.findByUsername(dto.getUsernameReceiver()).get();


        ModelMapper mapper = new ModelMapper();

        Message message = mapper.map(dto, Message.class);

        message.setUserReceived(userReceived);
        message.setUserSent(userSent);

        messageRepository.save(message);
    }
}
