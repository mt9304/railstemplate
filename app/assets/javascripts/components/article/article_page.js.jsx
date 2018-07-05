class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this.getDataFromApi();
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
        alert('Cannot get data from API: '+ error);
      }
    });
  }

  handleUpdate(e) {
      var self = this;
      var articleId = this.state.article.id;
    //e.preventDefault();
    if (this.validRecord()) {
      var event_data = {
        name: this.recordValue("name"),
        description: this.recordValue("description"),
        date: this.recordValue("date"),
        place: this.recordValue("place")
      };
      $.ajax({
        method: 'PUT',
        url: '/api/articles/' + this.props.event.id,
        data: { event: event_data },
        success: function(data) {
          this.props.handleUpdateRecord(this.props.event, data);
          this.setState({ edit: false });
        }.bind(this),
        error: function(xhr, status, error) {
          alert('Cannot update requested record: ', error);
        }
      });
    } else {
      alert('Please fill all fields.');
    }
  }

  render() {
    const { error, isLoaded, article } = this.state;

    if (error) {
      const { error, isLoaded, status } = this.state;
      return (<div>Error: {status}</div>);
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="blog-header">
            <div className="container">
              <h1 className="blog-title">{article[0].name}</h1>
              <p className="lead blog-description">{article[0].description}</p>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-sm-9 blog-main" dangerouslySetInnerHTML={{__html: article[0].content}} >

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
