import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterAscDesc() {
  const columnSort = ['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const { setSort, setColumnSort,
    onClickSort, onDeleteFilter } = useContext(PlanetsContext);
  return (
    <div className='filters-order'>
      {/* Column-sort */}
        <select
          data-testid="column-sort"
          onChange={ ({ target: { value } }) => setColumnSort(value) }
          >
          {columnSort.map((option) => (
            <option key={ option } value={ option }>{option}</option>
            ))}
        </select>

      {/* Asc-Desc */}
      <div className='filters-asc'>
        <label htmlFor="asc-desc">
          <div className='filter-asc-desc'>
            <input
              type="radio"
              name="asc-desc"
              className="radio-input"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ ({ target: { value } }) => setSort(value) }
            />
            Ascendente
          </div>
          <div className='filter-asc-desc'>
            <input
              type="radio"
              name="asc-desc"
              className="radio-input"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ ({ target: { value } }) => setSort(value) }
            />
            Descendente
          </div>
        </label>

        {/* Column-sort-button */}
      </div>
      <div className='btn-order-delete'>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ onClickSort }
          >
          ORDER
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => onDeleteFilter('deleteAllFilter') }
          >
          REMOVE FILTERS
        </button>
      </div>
    </div>
  );
}

export default FilterAscDesc;
