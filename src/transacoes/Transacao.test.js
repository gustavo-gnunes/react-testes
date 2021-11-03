import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";

describe("Componente de transação do extrato", () => {
  it("O snapshotdo componente deve permanecer sempre o mesmo", () => {
    // container: resultado renderizado do render
    const { container } = render(
      <Transacao data='08/09/2020' tipo='saque' valor='20.00' />
    );

    // toMatchSnapshot(): deve ser igual ao Snapshot que ele gerou. Ex: sempre vai ter data, descrição e valor
    // container.firstChild: elemento já montado no html
    expect(container.firstChild).toMatchSnapshot();
  });
});
