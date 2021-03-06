package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

   List<Message> getMessagesByUserReceived_UsernameOrUserSent_Username(String userReceived, String userSent);

   List<Message> getMessagesByUserReceived_UsernameAndUserSent_Username(String userReceived, String userSent);

}
