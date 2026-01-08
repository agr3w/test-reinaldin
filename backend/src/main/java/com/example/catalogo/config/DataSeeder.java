package com.example.catalogo.config; // Ajuste o pacote se precisar

import com.example.catalogo.model.Categoria;
import com.example.catalogo.repository.CategoriaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

/**
 * Classe responsável por popular o banco de dados com dados iniciais.
 * Implementa CommandLineRunner para executar o código após a inicialização do
 * Spring Boot.
 * Aqui, estamos populando a tabela de categorias com alguns valores padrão.
 * 
 * @author Weslley kampa
 */
@Configuration
public class DataSeeder implements CommandLineRunner {

    private final CategoriaRepository categoriaRepository;

    public DataSeeder(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verifica se já existem categorias. Se não tiver nada (count == 0), ele
        // cadastra.
        if (categoriaRepository.count() == 0) {
            Categoria c1 = new Categoria();
            c1.setNome("Eletrônicos");

            Categoria c2 = new Categoria();
            c2.setNome("Móveis");

            Categoria c3 = new Categoria();
            c3.setNome("Roupas");

            Categoria c4 = new Categoria();
            c4.setNome("Livros");

            categoriaRepository.saveAll(Arrays.asList(c1, c2, c3, c4));
            System.out.println("--- SEEDER: Categorias cadastradas com sucesso! ---");
        }
    }
}