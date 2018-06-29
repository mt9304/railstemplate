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

  componentDidMount() {
    //For initializing Quill editor: http://jsplanet.net/plugin/1069/javascript/quill
    const scriptElement = document.createElement("script");
    const rawScript = "var editor = new Quill('#editor', { modules: { toolbar: '#toolbar' }, theme: 'snow' });";
    const scriptNode = document.createTextNode(rawScript);
    scriptElement.appendChild(scriptNode);
    document.body.appendChild(scriptElement);
  }
  
  render() {
    return(
      <form className="ta-input-block" onSubmit={this.handleAdd.bind(this)}>
        <div className="ta-top-input">
          <div className="form-group ta-left">
            <input type="text"
                   className="form-control"
                   name="name"
                   placeholder="Name"

                   value={this.state.name}
                   onChange={this.handleChange.bind(this)} />
          </div>
          <div className="form-group ta-right">
            <input type="date"
                   className="form-control"
                   name="article_date"
                   placeholder="Article Date"

                   value={this.state.article_date}
                   onChange={this.handleChange.bind(this)} />
          </div>
        </div>

        <div className="ta-bottom-input">
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
        </div>

        <div id="toolbar" className="ta-quill-toolbar">
          <button className="ql-bold">Bold</button>
          <button className="ql-italic">Italic</button>
        </div>

        <div id="editor" className="ta-quill-textbox">
          <p></p>
        </div>



        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
};