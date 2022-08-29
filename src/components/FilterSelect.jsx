import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterSelect() {
  const { setColumn, setComparison, setNumberValue,
    onClickFilter,
    columnFilter,
    numberValue,
  } = useContext(PlanetsContext);
  const comparisonFilter = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      {(columnFilter.length !== 0)
        ? (
          <select
            data-testid="column-filter"
            onChange={ ({ target: { value } }) => setColumn(value) }
          >
            {columnFilter.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
          </select>
        ) : <p/> }

      {/* comparison-filter */}
      <select
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setComparison(value) }
      >
        {comparisonFilter.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
      </select>

      {/* number-filter */}
      <input
        type="number"
        data-testid="value-filter"
        className="number-input"
        value={ numberValue }
        onChange={ ({ target: { value } }) => setNumberValue(value) }
      />

      {/* data-testid='button-filter' */}
      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClickFilter }
      >
        FILTER
      </button>
    </div>
  );
}

export default FilterSelect;
