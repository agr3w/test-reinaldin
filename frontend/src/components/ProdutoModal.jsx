import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { criarProduto, getCategorias } from '../services/api';

const ProdutoModal = ({ show, handleClose, aoSalvar }) => {
    const [categorias, setCategorias] = useState([]);

    // Estado do Formulário
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [categoriaId, setCategoriaId] = useState('');

    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    const [loading, setLoading] = useState(false);

    /** Carregar categorias quando o modal abrir */
    useEffect(() => {
        if (show) {
            carregarCategorias();
            limparFormulario();
        }
    }, [show]);

    /** Carrega as categorias do backend */
    const carregarCategorias = async () => {
        try {
            const response = await getCategorias();
            setCategorias(response.data);
            if (response.data.length > 0) setCategoriaId(response.data[0].id);
        } catch (error) {
            console.error("Erro ao carregar categorias", error);
        }
    };

    /** Limpa os campos do formulário */
    const limparFormulario = () => {
        setNome('');
        setDescricao('');
        setPreco('');
        setMensagem({ tipo: '', texto: '' });
    };

    /** Trata o envio do formulário para criar um novo produto */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensagem({ tipo: '', texto: '' });

        const produtoDTO = {
            nome: nome,
            descricao: descricao,
            preco: parseFloat(preco),
            categoria: { id: categoriaId }
        };

        try {
            await criarProduto(produtoDTO);
            setMensagem({ tipo: 'success', texto: 'Produto cadastrado com sucesso!' });
            aoSalvar();
            setTimeout(() => {
                handleClose();
            }, 1500);

        } catch (error) {
            console.error(error);
            setMensagem({ tipo: 'danger', texto: 'Erro ao salvar produto. Verifique os dados.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Novo Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mensagem.texto && <Alert variant={mensagem.tipo}>{mensagem.texto}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome *</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Preço (R$) *</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={preco}
                            onChange={e => setPreco(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria *</Form.Label>
                        <Form.Select
                            value={categoriaId}
                            onChange={e => setCategoriaId(e.target.value)}
                        >
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nome}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar Produto'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProdutoModal;