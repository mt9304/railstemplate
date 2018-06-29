class NewArticleForm extends React.Component {

  constructor(props) {
  	super(props);
	this.state = { name: "", article_date: "", description: "", content: "", tags: "" }; 
  console.log(this.state.name);
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
    var current_state = this.state;
    console.log(current_state);
    //if (this.isValidForm()) {}
    if (true) {
      $.ajax({
        url: '/api/articles',
        method: 'POST',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: { article: current_state },
        success: function(data) {
          console.log("Adding Record " + current_state);
          //self.props.handleAdd(data);
          console.log("Adding Record2");
          //self.setState({ name: "", article_date: "", description: "", content: "", tags: "" });
        },
        error: function(xhr, status, error) {
          alert('Cannot add a new record: ' + self.state.name , error);
        }
      })
    } else {
      alert('Please fill all fields.');
    }
  }

  handleChange(e) {
    var input_name = e.target.name;
    var value = e.target.value;
    this.setState({[input_name] : value});
    console.log(this.state);
  }
  
  render() {
    return(
      <form className="form-inline" onSubmit={this.handleAdd.bind(this)}>
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