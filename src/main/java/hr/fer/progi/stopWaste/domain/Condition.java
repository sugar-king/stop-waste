package hr.fer.progi.stopWaste.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "conditions")
public class Condition {

    @Id
    @GeneratedValue
    private Long idCondition;

    @NotNull
    private String conditionName;

}
