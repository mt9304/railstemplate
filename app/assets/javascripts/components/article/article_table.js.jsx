class ArticleTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  /** Remember to use this instead of componentWillReceiveProps since it's deprecated and derived state was added in react 16.3 in its place. react rails is currently on 16.2, can't use this just yet. 
  static getDeriveStateFromProps(nextProps, prevState) {
      return {
        filteredArticles: nextProps.filteredArticles
      };
  }
  **/

  checkIfAdmin() {
      $.ajax({
        url: '/api/articles/new',
        success: function(admin) {
          console.log(admin);
        },
        error: function(xhr, status, error) {
          console.log("Error checking permission. ");
        }
      });


  }

  renderItems() {
    return this.state.filteredArticles.map((item) => (
      <Article key={item.id} item={item} />
  ));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props)
    {
      this.setState(nextProps);
    }
  }

  componentWillMount() {

  }

  render() {
    this.checkIfAdmin();
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th className='col-md-3'>Name</th>
            <th className='col-md-2'>Date</th>
            <th className='col-md-3'>Description</th>
            <th className='col-md-4'>Actions</th>
          </tr>
        </thead>
        <tbody>{this.renderItems()}</tbody>
      </table>
      );
  }
}
