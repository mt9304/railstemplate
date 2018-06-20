class NewArticleForm extends React.Component {

  constructor(props) {
  	super(props);
	this.state = { name: "", article_date: "", description: "", content: "", tags: "" }; 
  }

  isValidForm() {
    if (this.state.name && this.state.article_date && 
        this.state.description && this.state.content) {
      return true;
    } else {
      return false;
    }
  }

  handleAdd(e) {
    e.preventDefault();
    var self = this;
    //if (this.isValidForm()) {}
    if (true) {
      $.ajax({
        url: '/api/articles',
        method: 'POST',
        data: { article: self.state },
        success: function(data) {
          console.log("Adding Record");
          self.props.handleAdd(data);
          console.log("Adding Record2");
          self.setState({ name: "", article_date: "", description: "", content: "", tags: "" });
        },
        error: function(xhr, status, error) {
          alert('Cannot add a new record: ', error);
        }
      })
    } else {
      alert('Please fill all fields.');
    }
  }

  handleChange(e) {
    var input_name = e.target.name;
    var value = e.target.value;
    this.setState({ [input_name] : value });
  }
  
  render() {
    return(
      <form className="form-inline" onSubmit={this.handleAdd}>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 name="name"
                 placeholder="Name"

                 value={this.state.name}
                 onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <input type="date"
                 className="form-control"
                 name="article_date"
                 placeholder="Article Date"

                 value={this.state.article_date}
                 onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 name="description"
                 placeholder="Description"

                 value={this.state.description}
                 onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 name="content"
                 placeholder="Content"

                 value={this.state.content}
                 onChange={this.handleChange.bind(this)} />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    )
  }
};