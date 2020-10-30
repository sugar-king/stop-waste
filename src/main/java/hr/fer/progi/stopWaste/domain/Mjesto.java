package hr.fer.progi.stopWaste.domain;


import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Mjesto {

    @Id
    private String grad;

    @Column(unique=true, nullable=false)
    @NotNull
    //@Size(min=5, max=5)
    private String postBroj;

    @OneToMany
    private Set<Adresa> adrese;

    public String getGrad() {
        return grad;
    }

    public void setGrad(String grad) {
        this.grad = grad;
    }

    public String getPostBroj() {
        return postBroj;
    }

    public void setPostBroj(String postBroj) {
        this.postBroj = postBroj;
    }

    public Set<Adresa> getAdrese() {
        return adrese;
    }

    public void setAdrese(Set<Adresa> adrese) {
        this.adrese = adrese;
    }

}
