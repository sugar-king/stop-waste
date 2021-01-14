package hr.fer.progi.stopWaste.dao;

import hr.fer.progi.stopWaste.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
class UserRepositoryTest {
   @Autowired
   private TestEntityManager entityManager;

   @Autowired
   private UserRepository userRepository;

   @Test
   public void whenFindByUsername_thenReturnUser() {
      User user = new User("test", "test@test.hr", "testing", "Test", "Test");
      entityManager.persist(user);
      entityManager.flush();

      Optional<User> found = userRepository.findByUsername(user.getUsername());

      assert found.isPresent();
      assertEquals(user.getUsername(), found.get().getUsername());
   }

   @Test
   public void whenExistsByUsername_thenReturnUser() {
      User user = new User("test", "test@test.hr", "testing", "Test", "Test");
      entityManager.persist(user);
      entityManager.flush();

      if (userRepository.existsByUsername("test")) {
         assert userRepository.findByUsername("test").isPresent();
      } else {
         assert userRepository.findByUsername("test").isEmpty();
      }
      if (userRepository.existsByUsername("test1")) {
         assert userRepository.findByUsername("test1").isPresent();
      } else {
         assert userRepository.findByUsername("test1").isEmpty();
      }
   }

   @Test
   public void whenExistsByEmail_thenReturnUser() {
      User user = new User("test", "test@test.hr", "testing", "Test", "Test");
      entityManager.persist(user);
      entityManager.flush();

      if (userRepository.existsByEmail("test@test.hr")) {
         assertTrue(userRepository.findByEmail("test@test.hr").isPresent());
      } else {
         assertTrue(userRepository.findByEmail("test@test.hr").isEmpty());
      }
      if (userRepository.existsByEmail("test1@test.hr")) {
         assertTrue(userRepository.findByEmail("test1@test.hr").isPresent());
      } else {
         assertTrue(userRepository.findByEmail("test1@test.hr").isEmpty());
      }
   }

}