const AnaliseDeDados = require('../src/analiseDeDados');

describe('Testes simplificados para a classe AnaliseDeDados', () => {
  let analise;

  beforeEach(() => {
    analise = new AnaliseDeDados([1, 2, 3, 4, 5]);
  });

  test('adicionarDados deve adicionar novos dados', () => {
    analise.adicionarDados([6, 7]);
    expect(analise.dados).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test('limparDados deve limpar todos os dados', () => {
    analise.limparDados();
    expect(analise.dados).toEqual([]);
  });

  test('ordenarDados deve retornar dados ordenados', () => {
    expect(analise.ordenarDados()).toEqual([1, 2, 3, 4, 5]);
  });

  test('calcularMedia deve retornar a média dos dados', () => {
    expect(analise.calcularMedia()).toBe(3);
  });

  test('calcularMediana deve retornar a mediana dos dados', () => {
    expect(analise.calcularMediana()).toBe(3);
  });

  test('calcularModa deve retornar a moda dos dados', () => {
    analise.adicionarDados([5, 5]);
    expect(analise.calcularModa()).toEqual([5]);
  });

  test('calcularVariancia deve retornar a variância dos dados', () => {
    expect(analise.calcularVariancia()).toBe(2);
  });

  test('calcularDesvioPadrao deve retornar o desvio padrão', () => {
    expect(analise.calcularDesvioPadrao()).toBeCloseTo(1.41, 2);
  });

  test('encontrarMinimo deve retornar o valor mínimo', () => {
    expect(analise.encontrarMinimo()).toBe(1);
  });

  test('encontrarMaximo deve retornar o valor máximo', () => {
    expect(analise.encontrarMaximo()).toBe(5);
  });

  test('normalizarDados deve normalizar os dados', () => {
    expect(analise.normalizarDados()).toEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  test('calcularSoma deve retornar a soma dos dados', () => {
    expect(analise.calcularSoma()).toBe(15);
  });

  test('calcularProduto deve retornar o produto dos dados', () => {
    expect(analise.calcularProduto()).toBe(120);
  });

  test('calcularAmplitude deve retornar a amplitude dos dados', () => {
    expect(analise.calcularAmplitude()).toBe(4);
  });

  test('calcularCorrelacao deve calcular correlação entre dois conjuntos', () => {
    const outroConjunto = [1, 2, 3, 4, 5];
    expect(analise.calcularCorrelacao(outroConjunto)).toBeCloseTo(1, 14);  // Precisão de 14 casas decimais
  });

  // Testando calcularCorrelacao com dados negativos e positivos
  test('calcularCorrelacao deve calcular corretamente com valores negativos e positivos', () => {
    const outroConjunto = [-1, -2, -3, -4, -5];
    expect(analise.calcularCorrelacao(outroConjunto)).toBeCloseTo(-1, 14);
  });

  //testando
  test('calcularMedia deve retornar null para dados vazios', () => {
    analise.limparDados();
    expect(analise.calcularMedia()).toBeNull();
  });

  test('calcularMediana deve retornar null para dados vazios', () => {
    analise.limparDados();
    expect(analise.calcularMediana()).toBeNull();
  });

  test('calcularModa deve retornar null para dados vazios', () => {
    analise.limparDados();
    expect(analise.calcularModa()).toBeNull();
  });

  // Testando removerOutliers
  test('removerOutliers deve remover dados fora do intervalo interquartílico', () => {
    analise.adicionarDados([100, 200, 300]);
    analise.removerOutliers();
    expect(analise.dados).toEqual([1, 2, 3, 4, 5]);  // Valores 100, 200 e 300 devem ser removidos
  });

  // Testando calcularCorrelacao com conjuntos de tamanhos diferentes
  test('calcularCorrelacao deve retornar null para conjuntos de tamanhos diferentes', () => {
    const outroConjunto = [1, 2, 3];  // Menor que o conjunto original
    expect(analise.calcularCorrelacao(outroConjunto)).toBeNull();
  });

  // Testando calcularPercentil com um valor fora do intervalo
  test('calcularPercentil deve retornar null para percentis fora do intervalo [0, 100]', () => {
    expect(analise.calcularPercentil(-10)).toBeNull();
    expect(analise.calcularPercentil(110)).toBeNull();
  });

  // Testando calcularPercentil com valor 
  test('calcularPercentil deve retornar o percentil correto', () => {
    expect(analise.calcularPercentil(50)).toBe(3);  // Percentil 50 (mediana)
  });
});
