import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Hello World"
    };
  }

  changeContent() {
    // debugger;
    this.setState({
      content: "Update Content"
    });
  }

  render() {
    console.log(this.state);
    const { content } = this.state;
    return (
      <section>
        <div>{content}</div>
        <button onClick={() => this.changeContent()}>调用 setState</button>
      </section>
    );
  }
}

export default App;
