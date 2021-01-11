package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.rest.dto.request.MessageDTO;
import hr.fer.progi.stopWaste.rest.dto.response.MessageResponseDTO;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    private final JwtUtils jwtUtils;

    public MessageController(MessageService messageService, JwtUtils jwtUtils) {
        this.messageService = messageService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("all")
    public ResponseEntity<List<MessageResponseDTO>> getAllMessages(@RequestHeader(name = "Authorization") String token) {
        return ResponseEntity.ok().body(messageService.getAllMessages(jwtUtils.getUserNameFromJwtToken(token)));
    }


    @PostMapping("newMessage")
    public void saveMessage(@RequestHeader(name = "Authorization") String token, @RequestBody MessageDTO dto) {
        messageService.createMessage(dto, jwtUtils.getUserNameFromJwtToken(token));
    }


}
