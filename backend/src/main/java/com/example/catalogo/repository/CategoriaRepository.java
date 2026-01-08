package com.example.catalogo.repository;

import com.example.catalogo.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositório JPA para a entidade Categoria.
 * Permite operações CRUD e consultas personalizadas.
 * @author Weslley Kampa
 */
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    // Só de estender JpaRepository, você já ganhou: save(), findAll(), findById(), delete()...
}
