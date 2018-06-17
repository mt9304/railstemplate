class ArticleApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "", articles: [] };
  }

  componentDidMount() {
    //console.log("didmount1");
    this.getDataFromApi();
    //console.log(this.state);
  }

  getDataFromApi() {
    console.log("Gettingdata");
    var self = this;
    $.ajax({
      url: '/api/articles',
      success: function(data) {
        self.setState({ error: false, isLoaded: true, articles: data});
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  }

  updateSearch(event) {
    //console.log(event.target.value.substr(0, 20));
    this.setState({search: event.target.value.substr(0, 20)});
    //console.log("set to " + this.state.search);
  }

  render() {
    //console.log("Rendering");
    const { error, isLoaded, articles, search } = this.state;
    let filteredArticles = this.state.articles.filter(
      (article) => {
        return article.name.indexOf(this.state.search) !== -1;
      }
    );

    //console.log(filteredArticles);
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
            <div className="col-md-4">
              <SearchForm value={this.state.search} onChange={this.updateSearch.bind(this)} />
            </div>

            <div className="col-md-4">
              <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
            </div>

          </div>
          <div className="row">
            <div className="col-md-12">
              <ArticleTable filteredArticles={filteredArticles} />
            </div>
          </div>
        </div>
      );
    }
  }
}
