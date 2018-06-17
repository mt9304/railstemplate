class Article extends React.Component {

  constructor(props) {
    console.log("Calling article constructor");
    super(props);
    this.state = props;
  }


  render() {
    return (
          <tr>
            <td>{this.state.item.name}</td>
            <td>{this.state.item.article_date}</td>
            <td>{this.state.item.description}</td>
            <td>{this.state.item.content}</td>
          </tr>
  )} 
}