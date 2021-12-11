import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Layout/Navbr";
import Users from "./Components/Users/Users";
import axios from "axios";
import Search from "./Components/Users/Search";
import Alert from "./Components/Layout/Alert";

const github = axios.create({
  baseURL: "https://api.github.com",
  timeout: 1000,
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});

class App extends Component {
  state = {
    loading: false,
    users: [],
    alert: null,
  };

  // async componentDidMount() {
  //   console.log(process.env.R_APP_GIT_CLIENT_SECRET);
  //   this.setState({ loading: true });

  // const res = await axios.get(
  //   `https://api.github.com/users?client_id=${process.env.R_APP_GIT_CLIENT_ID}&client_secret=${process.env.R_APP_GIT_CLIENT_SECRET}`
  // );

  // this.setState({ users: res.data, loading: false });
  // }
  // search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    // const res = await axios.get(
    //   `https://api.github.com/search/users?q=${text}&client_id=${process.env.R_APP_GIT_CLIENT_ID}&client_secret=${process.env.R_APP_GIT_CLIENT_SECRET}`
    // );
    const res = await github.get(`/search/users?q=${text}`);

    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlerts = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { loading, users } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlerts={this.setAlerts}
                    />
                    <Users users={users} loading={loading} />
                  </>
                }
              ></Route>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
