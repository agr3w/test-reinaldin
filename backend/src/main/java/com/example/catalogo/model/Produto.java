package com.example.catalogo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

/** 
 * Modelo de Produto para o catálogo.
 * @author Weslley Kampa
 */
@Data
@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private BigDecimal preco; 

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
}