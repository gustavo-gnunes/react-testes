// fazer teste do arquivo App.js

import React from "react";
// para renderizar o componente (fazer com que ele seja exibido)
// render: faz com que o teste acha o texto
// screen: para o teste conseguir acessar o componente que foi criado
import { render, screen, fireEvent } from "@testing-library/react";
import App, { calcularNovoSaldo } from "./App";

describe("Componente principal", () => {
  // testando o componente App.js
  describe("Qdo eu abro o app do banco", () => {
    it("o nome é exibido", () => {
      console.log("passou");
      render(<App />);
      // toBeInTheDocument(): para saber se o nome do banco está sempre no documento html
      // screen: para acessar o componente. getByText: bucar por um texto
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    it("o saldo é exibido", () => {
      render(<App />);

      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    it("o botão de realizar transação é exibido", () => {
      render(<App />);

      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  // testando uma função especifica
  describe("Qdo eu realizo uma transação", () => {
    it("que é um saque, o valor vai diminuir", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };
      const saldo = 150;

      const novoSaldo = calcularNovoSaldo(valores, saldo);

      // toBe(100): é o valor que vc espera que o seu novo Saldo fica
      expect(novoSaldo).toBe(100);
    });

    // testa a transação ao todo, se o valor do saldo vai diminuir ...
    it("que é um saque, a transação deve ser realizada", () => {
      // <App />: é qual componente que vai ser testado
      // { ... }: todas são funções do próprio render
      /**
      const { getByText, getByTestId, getByLabelText } = render(<App />);

      // pegar o Saldo
      const saldo = getByText("R$ 1000");
      // buscar transação pela label do input
      const transacao = getByLabelText("Saque");
      const valor = getByTestId("valor");
      const botaoTransacao = getByText("Realizar operação");
      */
      //  OUTRA FORMA DE FAZER
      render(<App />);

      // pegar o Saldo
      const saldo = screen.getByText("R$ 1000");
      // buscar transação pela label do input
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      // textContent: para pegar o valor que está escrito
      // toBe(): qual é o valor esperado
      expect(saldo.textContent).toBe("R$ 1000");

      // fireEvent: para selecionar qual tipo de transação vai ser usada, simula um evento do DOM
      // click: deve ser click, pq na aplicação deve checar se é deposito ou saque
      fireEvent.click(transacao, { target: { value: "saque" } });
      // change: para modificar o valor do input text
      fireEvent.change(valor, { target: { value: 10 } });
      // click: dispara um evento de click do botão
      fireEvent.click(botaoTransacao);

      // textContent: para pegar o valor que está escrito
      expect(saldo.textContent).toBe("R$ 990");
    });
  });
});
