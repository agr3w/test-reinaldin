import { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Card, Button, Badge } from 'react-bootstrap';
import { getCategorias, getProdutos, filtrarProdutos } from './services/api';
import ProdutoModal from './components/ProdutoModal';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Estados para o filtro
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  const carregarDadosIniciais = async () => {
    try {
      setLoading(true);
      const [catResponse, prodResponse] = await Promise.all([
        getCategorias(),
        getProdutos()
      ]);
      setCategorias(catResponse.data);
      setProdutos(prodResponse.data);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
      alert("Erro ao conectar com o servidor. O Java está rodando?");
    } finally {
      setLoading(false);
    }
  };

  // Função de Busca/Filtragem
  const handleBuscar = async () => {
    // Buscar somente após a terceira letra (se tiver digitado algo)
    if (filtroNome && filtroNome.length < 3) {
      alert("Digite pelo menos 3 letras para buscar por nome.");
      return;
    }

    setLoading(true);
    try {
      const response = await filtrarProdutos(filtroNome, filtroCategoria || null);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao filtrar", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Catálogo Reinaldin</Navbar.Brand>
          <Button variant="outline-light" onClick={() => setShowModal(true)}>
            Novo Produto
          </Button>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {/* --- SEÇÃO DE FILTROS --- */}
          <Col md={3} className="mb-4">
            <Card className="p-3 shadow-sm">
              <h5>Filtros</h5>

              <div className="mb-3">
                <label className="form-label">Nome do Produto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Cadeira"
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                />
                <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                  Mínimo de 3 caracteres
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label">Categoria</label>
                <select
                  className="form-select"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="primary"
                className="w-100"
                onClick={handleBuscar}
                disabled={loading}
              >
                {loading ? 'Buscando...' : 'Filtrar'}
              </Button>
            </Card>
          </Col>

          {/* --- SEÇÃO DE LISTAGEM --- */}
          <Col md={9}>
            <h4>Produtos Encontrados: {produtos.length}</h4>

            {produtos.length === 0 && !loading && (
              <div className="alert alert-warning mt-3">
                Nenhum produto encontrado com esses filtros.
              </div>
            )}

            <Row>
              {produtos.map(produto => (
                <Col md={4} className="mb-4" key={produto.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title>{produto.nome}</Card.Title>
                        <Badge bg="secondary">{produto.categoria?.nome}</Badge>
                      </div>
                      <Card.Text className="text-muted">
                        {produto.descricao || "Sem descrição"}
                      </Card.Text>
                      <h5 className="text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <ProdutoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        aoSalvar={carregarDadosIniciais} // Assim que salvar, ele recarrega a lista sozinho!
      />
    </>
  )
}

export default App