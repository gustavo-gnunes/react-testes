// fazer teste de integração com a api
import React from 'react';
import { render, screen } from '@testing-library/react';
import api from './api';
import App from './App';

// para simular a api, ele não vai pegar o que está dentro da api e sim o que está sendo passado lá em baixo, com as informações, que a api.listaTransacoes está recebendo
jest.mock('./api')

describe('Requisições para API', () => {
  // async: pq vai buscar dados da api, então deve esperar buscar
  it('Exibir lista de transações através da API', async () => {
    // seria o que vai retornar para api, qdo a função listaTransacao for chamada
    // para retornar 'os dois objetos', o valor da promise resolvida
    api.listaTransacoes.mockResolvedValue([
      {
        "valor": "10",
        "transacao": "saque",
        "data": "10/08/2020",
        "id": 1
      },
      {
        "transacao": "deposito",
        "valor": "20",
        "data": "26/09/2020",
        "id": 2
      }
    ]);

    render(<App />);

    // findByText: para saber se achou a lista a cima, se ela foi carregada. retorna uma promise
    // .toBeInTheDocument: para saber se está no documento
    // await: vai esperar 1 segundo, se o resultado retornar em 1 segundo, o teste passa, se não ele falha
    expect(await screen.findByText('saque')).toBeInTheDocument();

    // .children.lenght).toBe(2) : a qde de elemento que vou estar esperando, que neste caso são dois
    expect(screen.getByTestId('transacoes').children.length).toBe(2)
  });
});
