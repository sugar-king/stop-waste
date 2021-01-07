package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "conditions")
public class Condition {
    public Condition(ECondition eCondition) {
        this.conditionName = eCondition;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCondition;

    @Column(unique = true)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ECondition conditionName;

}
