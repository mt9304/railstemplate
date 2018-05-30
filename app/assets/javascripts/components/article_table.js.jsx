class ArticleTable extends React.Component {

  constructor(props) {
    super(props);
    this.props = {articles: []};
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
        <tbody>{articles}</tbody>
      </table>
      );
  }
}
