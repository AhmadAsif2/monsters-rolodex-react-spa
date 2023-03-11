import './App.css';
import { Component } from 'react';
import CardList from './Components/card-list/card-list.component.jsx';
import SearchBox from './Components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  handleChange = (event) => {
    const searchField = event.target.value.toLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  // fetching data from API using promises
  componentDidMount() {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) =>
          this.setState(() => {
            return {
              monsters: users,
            };
          })
        )
        .catch((err) => console.error(err));
    }, 100);
  }

  render() {
    // destructuring of objects ES6
    const { monsters, searchField } = this.state;
    const { handleChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={handleChange}
          placeholder="Search Monsters"
          className="monsters-search-box"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
