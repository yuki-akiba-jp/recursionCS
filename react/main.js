function Title(props) {
  return <h1>{props.title}</h1>;
}

const title = <Title title="Fruits List" />;
document.getElementById("root").append(`<h1>hello</h1>`);

ReactDOM.render(title, document.getElementById("root"));
