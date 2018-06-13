class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {articles: []};
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var query = url.searchParams("search");
    console.log(query);
    var self = this;
    $.ajax({
      url: '/api/articles/search',
      success: function(data) {
        self.setState({ error: false, isLoaded: true, articles: data });
        self.props.handleSearch(data);
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  }

  render() {
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <input onChange={this.handleSearch}
            type="text"
            className="form-control"
            placeholder="Type search phrase here..."
            ref="query" />
      );
    }
  }
}
