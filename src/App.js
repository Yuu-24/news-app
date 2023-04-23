import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// import { Route, Router, Routes } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  constructor() {
    super()
    this.state={
      progress: 0
    }
    this.apikey=process.env.REACT_APP_NEWS_API
  }
  setProgress = (newProgress)=>{
    this.setState({progress: newProgress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='orange'
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" category="general" pageSize={8} />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" category="science" pageSize={8} />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" category="technology" pageSize={8} />} />
            <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" category="business" pageSize={8} />} />
            <Route path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" category="health" pageSize={8} />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" category="sports" pageSize={8} />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" category="entertainment" pageSize={8} />} />
          </Routes>

        </Router>

      </div>
    )
  }
}


