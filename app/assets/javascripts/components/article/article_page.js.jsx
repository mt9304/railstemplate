class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this.getDataFromApi();
    this.checkIfAdmin();
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
        self.setState({ error: true, roleChecked: true, status: error});
        alert('Cannot get user role: '+ error);
      }
    });
  }

  getDataFromApi() {
    var self = this;
    var currentURL = new URL(window.location.href);
    var nameParameter = currentURL.searchParams.get("name");
    $.ajax({
      url: '/api/articles/search?name='+nameParameter,
      success: function(data) {
        self.setState({ error: false, isLoaded: true, article: data });
      },
      error: function(xhr, status, error) {
        self.setState({ error: true, isLoaded: true, status: error});
        alert('Cannot get article data from API: '+ error);
      }
    });
  }

  recordValue(field) {
    return ReactDOM.findDOMNode(this.refs[field]).value;
  }

  render() {
    const { error, isLoaded, article, isAdmin, roleChecked } = this.state;
    //const editLink = "/articles/edit/"+article[0].name;
    if (article)
    {
      console.log(article[0].id);
    }

    if (error) {
      const { error, isLoaded, status, isAdmin, roleChecked } = this.state;
      return (<div>Error: {status}</div>);
    } else if (!isLoaded || !roleChecked) {
      return <div>Loading...</div>;
    } else {

      if (isAdmin)
      {
        var editLink = "/articles/" + article[0].id + "/edit";
        return (
          <div>
            <div className="blog-header">
              <div className="container">
                <h1 className="blog-title ta-article-text">{article[0].name}</h1>
                <p className="lead blog-description ta-article-text">{article[0].description}</p>
              </div>
            </div>

            <div className="container">
            <a className="btn btn-warning btn-sm" href={editLink}>Edit</a>
              <div className="row">
                <div className="col-sm-9 blog-main ta-article-text" dangerouslySetInnerHTML={{__html: article[0].content}} >

                </div>

                <div className="col-sm-3 offset-sm-1 blog-sidebar">
                  <ArticleSideMenu />
                </div>
              </div>
            </div>

            <nav className="blog-pagination">
              <span><a id="ta-previous" href="#">Previous</a></span>
              <span><a id="ta-next" href="#">Next</a></span>
            </nav>
          </div>
        );
      }
      else
      {
        return (
          <div>
            <div className="blog-header">
              <div className="container">
                <h1 className="blog-title ta-article-text">{article[0].name}</h1>
                <p className="lead blog-description ta-article-text">{article[0].description}</p>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-sm-9 blog-main ta-article-text" dangerouslySetInnerHTML={{__html: article[0].content}} >

                </div>

                <div className="col-sm-3 offset-sm-1 blog-sidebar">
                  <ArticleSideMenu />
                </div>
              </div>
            </div>

            <nav className="blog-pagination">
              <span><a id="ta-previous" href="#">Previous</a></span>
              <span><a id="ta-next" href="#">Next</a></span>
            </nav>
          </div>
        );
      }

    }
  }
}
