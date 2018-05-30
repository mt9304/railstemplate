class ArticleApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {articles: []};
  }

  componentDidMount() {
    console.log("didmount1");
    this.getDataFromApi();
    console.log("didmount2");
  }

  getDataFromApi() {
    var self = this;
    $.ajax({
      url: '/api/articles',
      success: function(data) {
        self.setState({ error: false, isLoaded: true, articles: data });
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
        <div className="container">
          <div className="jumbotron">
            <h1>Articles</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ArticleTable articles={this.state.articles} />
            </div>
          </div>
        </div>
      );
    }
  }
}
