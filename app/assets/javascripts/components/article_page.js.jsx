class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: { name: "", article_date: "", description: "", content: "", tags:"" } };
  }

  componentDidMount() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    var self = this;
    $.ajax({
      url: '/api/articles/search?name=aa',
      success: function(data) {
        self.setState({ error: false, isLoaded: true, article: data });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  }

  render() {
    const { error, isLoaded, article } = this.state;
    console.log(article);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="jumbotron">
            <h1>{article.name}</h1>
          </div>

          <p>{article.description}</p>

        </div>
      );
    }
  }
}
