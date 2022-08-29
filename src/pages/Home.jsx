import React, { useContext } from 'react';
import FilterAscDesc from '../components/FilterAscDesc';
import FilterSelect from '../components/FilterSelect';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';
import StarDead from './starDead.png'
import '../css/Home.css';

function Home() {
  const { setFilterByName, filtered, onDeleteFilter } = useContext(PlanetsContext);
  const filterColumn = {
    population: 'Population',
    orbital_period: 'Orbital Period',
    diameter: 'Diameter',
    rotation_period: 'Rotation Period',
    surface_water: 'Surface Water',
  }
  return (
    <div className='page-home'>
      <header className="header-home">
        <p className='p-star'>STAR</p>
        <p className='p-wars'>WARS</p>
      </header>

    <section className='main-all'>
      {/* Filtros da Tabela */}
      <p>Filters</p>
      <div className='filters'>
        <div className='filter-name'>
            <input
              data-testid="name-filter"
              className="name-filter"
              onChange={ ({ target: { value } }) => setFilterByName(value) }
              placeholder="Planet Name"
            />
        </div>
        <div className='select-radio'>
          <div className='select-filter'>
            <FilterSelect />
          </div>
          <div className='radio-filter'>
            <FilterAscDesc />
          </div>
        </div>
      </div>
      {/* Filtros Na tela */}
      { filtered.length !== 0
      && (
        <section className="get-filters">
          {filtered.map((item) => (
            <p key={ item.id } data-testid="filter" className='get-filter'>
              <button
                data-testid="btn-filter"
                className="btn-filter"
                type="button"
                onClick={ () => onDeleteFilter(item) }
                >
                <img src={ StarDead } alt="Death Star" width="50px" height="50px" />
              </button>
                {` ${filterColumn[item.column]} ${item.comparison} ${item.numberValue} `}
            </p>
          ))}
        </section>
      )}
      {/* Tabela dos Planetas */}

      <p>Planets</p>
      <div className='page-table'>
        <Table />
      </div>
    </section>
    </div>
  );
}

export default Home;
