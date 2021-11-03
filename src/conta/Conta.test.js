// teste para toda vez que passar um valor númerico ele passa um valor monetário. Ex: passa 100, exibe R$ 100

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Conta from "./Conta";

describe("Componente de conta", () => {
  it("Exibir o saldo da conte como valor monetário", () => {
    render(<Conta saldo={1000} />);

    // esse saldo-conta está no componenet Conta.js
    const saldo = screen.getByTestId("saldo-conta");

    // textContent: para acessar o conteúdo digitado
    expect(saldo.textContent).toBe("R$ 1000");
  });

  it("Chama a função de realizar transação, qdo o botão é clicado", () => {
    // jest.fn(): é uma função que não faz nada, mas da para checar se foi chamada no nosso teste
    const funcaoRealizarTransacao = jest.fn();
    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    // para simular uma ação do usuário, como se o usuário estivesse clicando no botão
    // getByText('Realizar operação'): como o botão chama
    fireEvent.click(screen.getByText("Realizar operação"));

    // .toHaveBeenCalled(): para saber se a função foi chamada
    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });
});
