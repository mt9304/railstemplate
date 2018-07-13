class ArticleApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "", articles: [] };
  }

  componentDidMount() {
    this.getDataFromApi();
    this.checkIfAdmin();
    console.log("Admin: " + this.state.isAdmin);
  }

  checkIfAdmin() {
    var self = this;
    $.ajax({
      url: '/api/check_role',
      success: function(role) {
        if (role.isAdmin)
        {
          self.setState({ isAdmin: true, roleChecked: true });
        }
        else
        {
          self.setState({ isAdmin: false, roleChecked: true });
        }
      },
      error: function(xhr, status, error) {
        self.setState({ error: true, isLoaded: true, status: error});
        alert('Cannot get user role: '+ error);
      }
    });
  }

  getDataFromApi() {
    var self = this;
    $.ajax({
      url: '/api/articles',
      success: function(data) {
        self.setState({ error: false, isLoaded: true, articles: data});
      },
      error: function(xhr, status, error) {
        self.setState({ error: false, isLoaded: true, status: error});
        alert('Cannot get data from API: '+ error);
      }
    });
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
  }

  render() {
    const { error, isLoaded, articles, search, isAdmin, roleChecked } = this.state;
    let filteredArticles = this.state.articles.filter(
      (article) => {
        return article.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );

    if (error) {
      const { error, isLoaded, status, isAdmin, roleChecked } = this.state;
      return (<div>Error: {status}</div>);
    } else if (!isLoaded || !roleChecked) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="jumbotron ta-bg-white">
            <h1>Articles</h1>
          </div>

          <div className="row">
            <div className="col-md-4">
              <SearchForm value={this.state.search} onChange={this.updateSearch.bind(this)} />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <ArticleTable filteredArticles={filteredArticles} isAdmin={this.state.isAdmin} />
            </div>
          </div>
        </div>
      );
    }
  }
}
