import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getProdutos = () => api.get('/produtos');
export const getCategorias = () => api.get('/categorias');

/**
 * Filtra produtos pelo nome e categoria
 * @param {*} nome 
 * @param {*} categoriaId 
 * @returns uma Promise com a lista de produtos filtrados
 */
export const filtrarProdutos = (nome, categoriaId) => {
    return api.get('/api/produtos', {
        params: {
            nome: nome,
            categoria_id: categoriaId // Tem que ser igual ao @RequestParam do Java
        }
    });
};

/**
 * Cria um novo produto
 * @param {*} produto 
 * @returns uma Promise com o produto criado
 */
export const criarProduto = (produto) => api.post('/produtos', produto);

export default api;