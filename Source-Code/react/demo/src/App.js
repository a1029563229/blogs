import React from "react";

class App extends React.Component {
  static getDerivedStateFromProps(props, state) {
    console.log("lifecycle getDerivedStateFromProps");
    return {
      ...state,
      count: ++state.count,
    };
  }

  constructor(props) {
    console.log("lifecycle constructor");
    super(props);
    this.state = {
      count: 0,
      content: "Hello World",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("lifecycle shouldComponentUpdate");
    if (nextState.count > 15) return false;
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("lifecycle getSnapshotBeforeUpdate");

    const countDOM = document.getElementById("count");
    return countDOM.innerText;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("lifecycle componentDidUpdate");

    console.log({ snapshot });
    if (snapshot === "3") {
      this.setState((prevState) => ({
        count: prevState.count * 2,
      }));
    }
  }

  componentDidMount() {
    console.log("lifecycle componentDidMount");

    const countDOM = document.getElementById("count");
    console.log({ countDOM });
  }

  changeContent() {
    this.setState({
      content: "Update Content",
    });
  }

  addCount() {
    this.setState((prevState) => ({
      count: ++prevState.count,
    }));
  }

  render() {
    console.log("lifecycle render");
    const { content, count } = this.state;
    return (
      <section>
        <section id="count">{count}</section>
        {count > 2 ? <span>当 count > 2 时将出现</span> : null}
        <div>{content}</div>
        <div>
          <button onClick={() => this.changeContent()}>调用 setState</button>
        </div>
        <div>
          <button onClick={() => this.addCount()}>count ++</button>
        </div>
      </section>
    );
  }
}

export default App;
