const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].texto).toBe('3 + 3 = ?'); 


  
  //testando num respostas
  expect(perguntas[0].num_respostas).toBe(0);
  expect(perguntas[1].num_respostas).toBe(0);
  expect(perguntas[2].num_respostas).toBe(0);

  //testando id
  expect(perguntas[0].id_pergunta).toBe(perguntas[1].id_pergunta-1);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
  expect(perguntas[2].id_pergunta).toBe(perguntas[1].id_pergunta+1);

  
  //testando get_pergunta
  const id0 = perguntas[0].id_pergunta;
  const id1 = perguntas[1].id_pergunta;
  const id2 = perguntas[2].id_pergunta;
  expect(modelo.get_pergunta(id0).texto).toBe('1 + 1 = ?');
  expect(modelo.get_pergunta(id1).texto).toBe('2 + 2 = ?');
  expect(modelo.get_pergunta(id2).texto).toBe('3 + 3 = ?');
  
  
});


test('Teste de cadastro de respostas', () => {

  modelo.cadastrar_pergunta('1 + 1 = ?');
  const perguntas = modelo.listar_perguntas();
  const id = perguntas[0].id_pergunta;
  modelo.cadastrar_resposta(id, "2");

  // testando se ha 1 resposta apenas
  expect(modelo.get_num_respostas(id)).toBe(1);

  //testando se o texto da resposta esta certo
  expect(modelo.get_respostas(id)[0].texto).toBe("2");

})



