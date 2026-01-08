import { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Card, Badge } from 'react-bootstrap';
import { getCategorias, getProdutos, filtrarProdutos } from './services/api';
import ProdutoModal from './components/ProdutoModal';
import Footer from './components/Footer';
import UiInput from './components/UiInput';
import UiButton from './components/UiButton';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Estados para o filtro
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleLimparFiltros = async () => {
    setFiltroNome('');
    setFiltroCategoria('');

    setLoading(true);
    try {
      const response = await filtrarProdutos('', null);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao filtrar ao limpar filtros", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Catálogo Reinaldin</Navbar.Brand>
          <UiButton variant="outline-light" onClick={() => setShowModal(true)}>
            Novo Produto
          </UiButton>
        </Container>
      </Navbar>

      <Container>
        <Row>

          {/* --- SEÇÃO DE FILTROS --- */}

          <Col md={3} className="mb-4">
            <Card className="p-3 shadow-sm">
              <h5>Filtros</h5>

              <div className="mb-3">
                <UiInput
                  label="Nome do Produto"
                  placeholder="Ex: Cadeira"
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleBuscar();
                    }
                  }}
                  smallText="Mínimo de 3 caracteres"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Categoria</label>
                <select
                  className="form-select"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleBuscar();
                    }
                  }}
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-grid gap-2">
                <UiButton
                  variant="primary"
                  className="w-100"
                  onClick={handleBuscar}
                  disabled={loading}
                >
                  {loading ? 'Buscando...' : 'Filtrar'}
                </UiButton>

                {(filtroNome || filtroCategoria) && (
                  <UiButton
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleLimparFiltros}
                  >
                    Limpar Filtros
                  </UiButton>
                )}
              </div>
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
                <Col md={6} lg={4} className="mb-4" key={produto.id}>
                  <Card className="h-100 shadow-sm card-hover">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="fw-bold">{produto.nome}</Card.Title>
                        <Badge bg="light" text="dark" className="border">{produto.categoria?.nome}</Badge>
                      </div>
                      <Card.Text className="text-muted flex-grow-1">
                        {produto.descricao || "Sem descrição"}
                      </Card.Text>
                      <div className="mt-3 border-top pt-3 d-flex justify-content-between align-items-center">
                        <small className="text-muted">À vista</small>
                        <span className="price-tag">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />

      <ProdutoModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        aoSalvar={carregarDadosIniciais}
      />
    </>
  )
}

export default App