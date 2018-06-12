class ArticleTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  renderItems() {
    return this.state.articles.map((item) => (
      <Article key={item.id} item={item} />
  ));
  }

  render() {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th className='col-md-3'>Name</th>
            <th className='col-md-2'>Date</th>
            <th className='col-md-3'>Description</th>
            <th className='col-md-4'>Content</th>
          </tr>
        </thead>
        <tbody>{this.renderItems()}</tbody>
      </table>
      );
  }
}
