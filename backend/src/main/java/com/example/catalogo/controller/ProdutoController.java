package com.example.catalogo.controller;

import com.example.catalogo.model.Categoria;
import com.example.catalogo.model.Produto;
import com.example.catalogo.repository.CategoriaRepository;
import com.example.catalogo.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador responsável pelas rotas relacionadas a produtos.
 * 
 * @author Weslley kampa
 */
@RestController
// @CrossOrigin libera o React (normalmente na porta 5173 ou 3000) para acessar
// o java
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final CategoriaRepository categoriaRepository;

    public ProdutoController(ProdutoService produtoService, CategoriaRepository categoriaRepository) {
        this.produtoService = produtoService;
        this.categoriaRepository = categoriaRepository;
    }

    // Rota: GET /produtos (Listagem Geral - Requisito 4.a)
    @GetMapping("/produtos")
    public List<Produto> listarTodos() {
        return produtoService.listarTodos();
    }

    // Rota: GET /api/produtos (Filtro Manual - Requisito 4.b)
    @GetMapping("/api/produtos")
    public List<Produto> filtrar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) Long categoria_id // O PDF pede esse nome exato no parametro
    ) {
        return produtoService.filtrarProdutos(nome, categoria_id);
    }

    // Rota: POST /produtos (Cadastro - Requisito 4.c)
    @PostMapping("/produtos")
    public Produto cadastrar(@RequestBody Produto produto) {
        return produtoService.salvar(produto);
    }

    // Rota: GET /categorias (Listagem de Categorias)
    @GetMapping("/categorias")
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }
}