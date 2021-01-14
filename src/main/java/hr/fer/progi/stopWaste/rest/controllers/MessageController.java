package hr.fer.progi.stopWaste.rest.controllers;

import hr.fer.progi.stopWaste.rest.dto.request.MessageDTO;
import hr.fer.progi.stopWaste.rest.dto.response.MessageResponseDTO;
import hr.fer.progi.stopWaste.security.jwt.JwtUtils;
import hr.fer.progi.stopWaste.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
   @PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public ResponseEntity<List<MessageResponseDTO>> getAllMessages(@RequestHeader(name = "Authorization") String token) {
      return ResponseEntity.ok().body(messageService.getAllMessages(jwtUtils.getUserNameFromJwtToken(token)));
   }


   @GetMapping("/{user}")
   @PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public ResponseEntity<List<MessageResponseDTO>> getMessagesWithUser(@RequestHeader(name = "Authorization") String token,
                                                                       @PathVariable("user") String user) {
      return ResponseEntity.ok().body(messageService.getMessagesWithUser(jwtUtils.getUserNameFromJwtToken(token), user));
   }


   @PostMapping("newMessage")
   @PreAuthorize("hasAnyRole('BUYER', 'SELLER', 'ADMIN')")
   public void saveMessage(@RequestHeader(name = "Authorization") String token, @RequestBody MessageDTO dto) {
      messageService.createMessage(dto, jwtUtils.getUserNameFromJwtToken(token));
   }


}
