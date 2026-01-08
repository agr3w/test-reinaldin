package com.example.catalogo.repository;

import com.example.catalogo.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repositório JPA para a entidade Produto.
 * Permite operações CRUD e consultas personalizadas.
 * @author Weslley Kampa
 */
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    // Busca pelo nome contendo a string (case insensitive)
    List<Produto> findByNomeContainingIgnoreCase(String nome);

    // Busca exata pela categoria
    List<Produto> findByCategoriaId(Long categoriaId);

    // Busca pelos dois ao mesmo tempo (Nome E Categoria)
    List<Produto> findByNomeContainingIgnoreCaseAndCategoriaId(String nome, Long categoriaId);
}