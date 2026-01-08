import { useEffect, useState } from 'react';
import { getCategorias, getProdutos, filtrarProdutos } from '../services/api';

export default function useCatalog() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const carregarDadosIniciais = async () => {
    try {
      setLoading(true);
      const [catResponse, prodResponse] = await Promise.all([getCategorias(), getProdutos()]);
      setCategorias(catResponse.data);
      setProdutos(prodResponse.data);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      alert('Erro ao conectar com o servidor. O Java está rodando?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDadosIniciais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuscar = async () => {
    if (filtroNome && filtroNome.length < 3) {
      alert('Digite pelo menos 3 letras para buscar por nome.');
      return;
    }
    setLoading(true);
    try {
      const response = await filtrarProdutos(filtroNome, filtroCategoria || null);
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao filtrar', error);
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
      console.error('Erro ao filtrar ao limpar filtros', error);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}