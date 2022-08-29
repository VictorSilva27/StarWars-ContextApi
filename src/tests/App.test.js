import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './mockData';
import userEvent from '@testing-library/user-event';

const api = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
};

describe('Realiza a requisição e retorna uma tabela', () => {
  beforeEach(api);
  afterEach(() => jest.clearAllMocks());
  it('Realiza a requisição e retorna uma tabela', async () => {
    render(<App />);
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
      const nameFilter = screen.getByTestId('name-filter');
      expect(nameFilter).toBeInTheDocument();
      const columnFilter = screen.getByTestId('column-filter');
      expect(columnFilter).toBeInTheDocument();
      const comparisonFilter = screen.getByTestId('comparison-filter');
      expect(comparisonFilter).toBeInTheDocument();
      const valueFilter = screen.getByTestId('value-filter');
      expect(valueFilter).toBeInTheDocument();
      const buttonFilter = screen.getByTestId('button-filter');
      expect(buttonFilter).toBeInTheDocument();
    });
  });

  it('Filtrar 2 planetas ao digitar "oo" no input do name', async () => {
    render(<App />);
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
      const inputNamePlanet = screen.getByRole('textbox');
      expect(inputNamePlanet).toBeInTheDocument();
      userEvent.type(inputNamePlanet, 'oo');
    });
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(3);
  });

  it('Filtrar a tabela de acordo com o click e os seus values do input e selects', async () => {
    render(<App />);
    const selectCombine = screen.getByTestId('column-filter');
    expect(selectCombine).toBeInTheDocument();
    const selectComparison = screen.getByTestId('comparison-filter');
    expect(selectComparison).toBeInTheDocument();
    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
      userEvent.selectOptions(selectCombine, 'orbital_period');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(valueInput, '430');
      userEvent.click(buttonFilter);      
    });
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(5);
    await waitFor(() => {
      userEvent.selectOptions(selectCombine, 'population');
      userEvent.selectOptions(selectComparison, 'menor que');
      userEvent.type(valueInput, '999999998');
      userEvent.click(buttonFilter);      
    });
    await waitFor(() => {
      userEvent.selectOptions(selectCombine, 'diameter');
      userEvent.selectOptions(selectComparison, 'igual a');
      userEvent.type(valueInput, '118000');
      userEvent.click(buttonFilter);
    });
    await waitFor(() => {
      userEvent.selectOptions(selectCombine, 'rotation_period');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(valueInput, '0');
      userEvent.click(buttonFilter);      
    });
    await waitFor(() => {
      userEvent.selectOptions(selectCombine, 'surface_water');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(valueInput, '0');
      userEvent.click(buttonFilter);      
    });
  });

  it('Ordernar os planetas', async () => {
    render(<App />);
    const combine = screen.getByTestId('column-sort');
    expect(combine).toBeInTheDocument();
    const ascendente = screen.getByDisplayValue(/asc/i);
    expect(ascendente).toBeInTheDocument();
    const desc = screen.getByTestId('column-sort-input-desc');
    expect(desc).toBeInTheDocument();
    const buttonOrder = screen.getByRole('button', {
      name: /order/i
    })
    expect(buttonOrder).toBeInTheDocument();
    await waitFor(() => {
      userEvent.selectOptions(combine, 'surface_water');
      userEvent.click(ascendente);
    });
    userEvent.click(buttonOrder);      
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(11);
    await waitFor(() => {
      userEvent.selectOptions(combine, 'population');
      userEvent.click(desc);
    });
    userEvent.click(buttonOrder);      
  });

  it('Remover todos os filtros', async () => {
    render(<App />);
    const selectCombine = screen.getByTestId('column-filter');
    expect(selectCombine).toBeInTheDocument();
    const selectComparison = screen.getByTestId('comparison-filter');
    expect(selectComparison).toBeInTheDocument();
    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    const remFilter = screen.getByTestId('button-remove-filters');
    expect(remFilter).toBeInTheDocument();
    await waitFor(() => {
      const table = screen.getAllByRole('row');
      expect(table).toHaveLength(11);
      userEvent.selectOptions(selectCombine, 'orbital_period');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(valueInput, '430');
      userEvent.click(buttonFilter);      
    });
    const table = screen.getAllByRole('row');
    expect(table).toHaveLength(5);
    await waitFor(() => {
      userEvent.selectOptions(selectCombine, 'population');
      userEvent.selectOptions(selectComparison, 'menor que');
      userEvent.type(valueInput, '999999998');
      userEvent.click(buttonFilter);      
    });
    userEvent.click(remFilter)
  });

  it('Remover 2 filtros', async () => {
    const {debug} = render(<App />);
    const selectCombine = screen.getByTestId('column-filter');
    expect(selectCombine).toBeInTheDocument();
    const selectComparison = screen.getByTestId('comparison-filter');
    expect(selectComparison).toBeInTheDocument();
    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    userEvent.clear(valueInput)
    userEvent.selectOptions(selectCombine, 'diameter');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.type(valueInput, '118000');
    await waitFor(() => {
      userEvent.click(buttonFilter);
    });
    userEvent.clear(valueInput)
    userEvent.selectOptions(selectCombine, 'population');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.type(valueInput, '200000');
    await waitFor(() => {
      userEvent.click(buttonFilter);
    });
    const remFilter = screen.getAllByTestId('btn-filter');
    expect(remFilter).toHaveLength(2);
    await waitFor(() => {
      userEvent.click(remFilter[0]);
    })
    userEvent.clear(valueInput)
    userEvent.selectOptions(selectCombine, 'orbital_period');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.type(valueInput, '200000');
    await waitFor(() => {
      userEvent.click(buttonFilter);
    });
    debug();
  });
});
