package com.example.catalogo.service;

import com.example.catalogo.model.Produto;
import com.example.catalogo.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Serviço responsável pelas operações relacionadas a produtos.
 * @author Weslley kampa
 */
@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> filtrarProdutos(String nome, Long categoriaId) {
        // Se tem nome E categoria
        if (nome != null && !nome.isEmpty() && categoriaId != null) {
            return produtoRepository.findByNomeContainingIgnoreCaseAndCategoriaId(nome, categoriaId);
        }

        // Se tem SÓ nome
        if (nome != null && !nome.isEmpty()) {
            return produtoRepository.findByNomeContainingIgnoreCase(nome);
        }

        // Se tem SÓ categoria
        if (categoriaId != null) {
            return produtoRepository.findByCategoriaId(categoriaId);
        }

        // Se não tem filtro nenhum, retorna tudo
        return produtoRepository.findAll();
    }

    /**
     * Salva um produto no banco de dados.
     * @param produto O produto a ser salvo.
     * @return O produto salvo.
     * @author Weslley kampa
     */
    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    /**
     * Lista todos os produtos do banco de dados.
     * @return Lista de produtos.
     * @author Weslley kampa
     */
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }
}