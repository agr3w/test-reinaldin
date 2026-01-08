package com.example.catalogo.model;

import jakarta.persistence.*;
import lombok.Data;

/** 
 * Modelo de Categoria para o catálogo de produtos.
 * @author Weslley Kampa
 */
@Data
@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;
}