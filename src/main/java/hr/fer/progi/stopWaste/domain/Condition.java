package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "conditions")
public class Condition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCondition;

    @Column(unique = true)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ECondition conditionName;

}
