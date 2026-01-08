import React from 'react';
import { Container, Row, Col, Navbar, Card, Badge } from 'react-bootstrap';
import useCatalog from './hooks/useCatalog';
import ProdutoModal from './components/ProdutoModal';
import Footer from './components/Footer';
import UiInput from './components/UiInput';
import UiButton from './components/UiButton';
import UiSelect from './components/UiSelect';

export default function App() {
  const {
    produtos,
    categorias,
    filtroNome,
    setFiltroNome,
    filtroCategoria,
    setFiltroCategoria,
    loading,
    showModal,
    setShowModal,
    carregarDadosIniciais,
    handleBuscar,
    handleLimparFiltros
  } = useCatalog();

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Catálogo Reinaldin</Navbar.Brand>
          <UiButton variant="outline-light" onClick={() => setShowModal(true)}>
            Novo Produto
          </UiButton>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="p-3 shadow-sm">
              <h5>Filtros</h5>

              <div className="mb-3">
                <UiInput
                  label="Nome do Produto"
                  placeholder="Ex: Cadeira"
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleBuscar(); }}
                  smallText="Mínimo de 3 caracteres"
                />
              </div>

              <div className="mb-3">
                <UiSelect
                  label="Categoria"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleBuscar(); }}
                  options={categorias.map(cat => ({ value: cat.id, label: cat.nome }))}
                  placeholder="Todas as categorias"
                />
              </div>

              <div className="d-grid gap-2">
                <UiButton variant="primary" className="w-100" onClick={handleBuscar} disabled={loading}>
                  {loading ? 'Buscando...' : 'Filtrar'}
                </UiButton>

                {(filtroNome || filtroCategoria) && (
                  <UiButton variant="outline-secondary" size="sm" onClick={handleLimparFiltros}>
                    Limpar Filtros
                  </UiButton>
                )}
              </div>
            </Card>
          </Col>

          <Col md={9}>
            <h4>Produtos Encontrados: {produtos.length}</h4>

            {produtos.length === 0 && !loading && (
              <div className="alert alert-warning mt-3">Nenhum produto encontrado com esses filtros.</div>
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
                      <Card.Text className="text-muted flex-grow-1">{produto.descricao || 'Sem descrição'}</Card.Text>
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

      <ProdutoModal show={showModal} handleClose={() => setShowModal(false)} aoSalvar={carregarDadosIniciais} />
    </>
  );
}