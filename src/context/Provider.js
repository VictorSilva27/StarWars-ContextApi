import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [column, setColumn] = useState('population');
  const [columnFilter, setColumnFilter] = useState(['population',
    'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);
  const [columnSort, setColumnSort] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [filterByName, setFilterByName] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [numberValue, setNumberValue] = useState('0');
  const [planets, setPlanets] = useState([]);
  const [planetsApi, setApiPlanet] = useState([]);
  const [sortFilter, setSort] = useState('');

  const onClickFilter = () => {
    const id = filtered.length;
    const objFilter = {
      column,
      comparison,
      numberValue,
      id,
    };
    const filterColumn = columnFilter.filter((item) => item !== column);
    if (comparison === 'maior que') {
      setPlanets(planets.filter((planet) => (+planet[column]) > (+numberValue)));
    }
    if (comparison === 'menor que') {
      setPlanets(planets.filter((planet) => (+planet[column]) < (+numberValue)));
    }
    if (comparison === 'igual a') {
      setPlanets(planets.filter((planet) => (+planet[column]) === (+numberValue)));
    }
    setColumn(filterColumn[0]);
    setColumnFilter(filterColumn);
    setFiltered([...filtered, objFilter]);
  };

  const onClickSort = () => {
    if (sortFilter === 'ASC') {
      return setPlanets([...[...planets.filter((e) => e[columnSort] !== 'unknown')
        .sort((a, b) => a[columnSort] - b[columnSort])],
      ...[...planets.filter((e) => e[columnSort] === 'unknown')]]);
    }
    return setPlanets([...[...planets.filter((e) => e[columnSort] !== 'unknown')
      .sort((a, b) => b[columnSort] - a[columnSort])],
    ...[...planets.filter((e) => e[columnSort] === 'unknown')]]);
  };

  const onDeleteFilter = (item) => {
    if (item === 'deleteAllFilter') {
      setColumnFilter(['population',
        'orbital_period', 'diameter',
        'rotation_period', 'surface_water']);
      setFiltered([]);
      setPlanets(planetsApi);
      return true;
    }
    const filterColumn = filtered.filter((e) => e.column === item.column);
    setColumnFilter([...columnFilter, filterColumn[0].column]);
    const deleteFilter = filtered.filter((e) => e.column !== item.column);
    setFiltered([...deleteFilter]);
  };

  useEffect(() => {
    const filterApiDelete = () => {
      let array = [...planetsApi];
      filtered.forEach((e) => {
        const filterede = (columnPlanet, valuePlanet) => {
          if (e.comparison === 'maior que') {
            return (+columnPlanet) > (+valuePlanet);
          }
          if (e.comparison === 'menor que') {
            return (+columnPlanet) < (+valuePlanet);
          }
          return (+columnPlanet) === (+valuePlanet);
        };
        array = array.filter((planet) => filterede(planet[e.column], e.numberValue));
      });
      setPlanets(array);
    };
    filterApiDelete();
  }, [filtered, planetsApi]);

  useEffect(() => {
    const getStarPlanets = async () => {
      const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((res) => res.json());
      const response = data.results;
      setApiPlanet(response);
      setPlanets(response.filter((planet) => planet.name.toLowerCase()
        .includes(filterByName.toLowerCase())));
    };
    getStarPlanets();
  }, [filterByName]);

  const context = {
    columnFilter,
    filtered,
    numberValue,
    planets,
    planetsApi,
    setColumn,
    setColumnSort,
    setComparison,
    setFilterByName,
    setNumberValue,
    setPlanets,
    setSort,
    onClickFilter,
    onClickSort,
    onDeleteFilter,
  };
  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
