class EditArticleForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { id: "", name: "", article_date: "", description: "", content: "", tags: "" };
	}

	isValidForm() {
	    if (this.state.name && this.state.article_date && 
	        this.state.description) {
	      return true;
	    } else {
	      return false;
	    }
	}

	getDataFromApi() {
		var self = this;
		var currentURL = window.location.href;
		var idParameter = currentURL.split("articles/")[1].split("/edit")[0];
		this.setState({ id: idParameter })
		$.ajax({
		  url: '/api/articles/' + idParameter,
		  success: function(data) {
		    self.setState({ error: false, isLoaded: true, article: data });
		    console.log(data);
		  },
		  error: function(xhr, status, error) {
		    self.setState({ error: true, isLoaded: true, status: error});
		    alert('Cannot get data from API: '+ error);
		  }
		});
	}

	handleUpdate(e) {
		//For getting Quill HTML content. 
		var richTextNode = document.getElementsByClassName('ql-editor')[0];
		htmlContent = richTextNode.innerHTML;
		this.setState({content: "htmlContent"});
		//Remember to delete above
		//console.log(htmlContent);

		e.preventDefault();
		var self = this;
		var current_state = this.state;
		current_state.content = htmlContent;
		console.log(current_state);
		if (this.isValidForm()) {
		//if (true) {
		  $.ajax({
		    url: '/api/articles/'+current_state.id,
		    method: 'PUT',
		    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		    data: { article: current_state },
		    success: function(data) {
		      //console.log("Adding Record " + current_state);
		      //self.props.handleUpdate(data);
		      //console.log("Adding Record2");
		      self.setState({ name: "", article_date: "", description: "", content: "", tags: "" });
		      richTextNode.innerHTML = "";
		      console.log("Post edited successfully");
		      //Add flash message here. 
		    },
		    error: function(xhr, status, error) {
		      alert('Cannot edit record: ' + self.state.name , status);
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
	}

	componentWillMount() {
		this.getDataFromApi();
	}

	componentDidMount() {
		//For initializing Quill editor: http://jsplanet.net/plugin/1069/javascript/quill
		const scriptElement = document.createElement("script");
		const rawScript = "var toolbarOptions = [['bold', 'italic'], ['link', 'image'],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],['blockquote', 'code-block'],[{ 'color': [] }, { 'background': [] }]];\nvar editor = new Quill('#editor', { modules: { toolbar: toolbarOptions }, theme: 'snow' });";
		const scriptNode = document.createTextNode(rawScript);
		scriptElement.appendChild(scriptNode);
		document.body.appendChild(scriptElement);
	}
  
	render() {
		return(
		  <form className="ta-input-block" onSubmit={this.handleUpdate.bind(this)}>
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
		    </div>

		    <div id="toolbar" className="ta-quill-toolbar">

		    </div>

		    <div id="editor" className="ta-quill-textbox" name="content" value={this.state.content} >
		      <p id="richText"></p>
		    </div>



		    <button type="submit" className="btn btn-primary">Submit</button>
		  </form>
		)
	}
};