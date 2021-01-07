package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.domain.Message;
import hr.fer.progi.stopWaste.rest.dto.request.MessageDTO;
import hr.fer.progi.stopWaste.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("all/{username}")
    public ResponseEntity<List<Message>> getAllMessages(@PathVariable("username") String username) {
        return ResponseEntity.ok().body(messageService.getAllMessages(username));
    }


    @PostMapping("newMessage/{username}")
    public void saveMessage(@PathVariable("username") String username, @Valid @RequestBody MessageDTO dto) {
        messageService.createMessage(dto, username);
    }


}
