class EditArticleForm extends React.Component {
	//Note: data from api is stored in article: while input stuff is just stored in the thing below without an article wrapper. Remember to fix this. 
	//Try using old article vs new article. 
	constructor(props) {
		super(props);
		//this.state = { article: { id: "", name: "", article_date: "", description: "", content: "", tags: "" }};
	}

	isValidForm() {
		console.log("Name: " + this.state.article.name + " Date: " + this.state.article.article_date + " Description: " + 
	        this.state.article.description);
	    if (this.state.article.name && this.state.article.article_date && 
	        this.state.article.description) {
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
		    self.populateInputFields();
		  },
		  error: function(xhr, status, error) {
		    self.setState({ error: true, isLoaded: true, status: error});
		    alert('Cannot get data from API: '+ error);
		  }
		});
	}

	handleUpdate(e) {

		//Remember to delete above
		//console.log(htmlContent);

		e.preventDefault();
		var current_state = this.state;
		var self = this;
		var name_input = document.getElementsByName("name")[0].value;
		var article_date_input = document.getElementsByName("article_date")[0].value;
		var description_input = document.getElementsByName("description")[0].value;
		var previous_article_input = document.getElementsByName("previous_article")[0].value;
		var next_article_input = document.getElementsByName("next_article")[0].value;
		//For getting Quill HTML content. 
		var richTextNode = document.getElementsByClassName('ql-editor')[0];
		htmlContent = richTextNode.innerHTML;
		this.setState( { article: { name: name_input, article_date: article_date_input, description: description_input, previous_article: previous_article_input, next_article: next_article_input, content: htmlContent } }, () => {
			current_state = this.state;
		
		//this.getInputData();

		//this.setState({ article: { content: "htmlContent"} });
		
		
		//current_state.article.content = htmlContent;
		//console.log(current_state);
		if (this.isValidForm()) {
		//if (true) {
		  $.ajax({
		    url: '/api/articles/'+current_state.id,
		    method: 'PUT',
		    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
		    data: { article: current_state.article },
		    success: function(data) {
		      //self.setState({ name: "", article_date: "", description: "", content: "", tags: "" });
		      //richTextNode.innerHTML = "";
		      //console.log(current_state);
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
		});
	}

	handleChange(e) {
		var input_name = e.target.name;
		var value = e.target.value;
		//this.setState({ article: { [input_name] : value} });
	}

	getInputData() {
		var name_input = document.getElementsByName("name")[0].value;
		var article_date_input = document.getElementsByName("article_date")[0].value;
		var description_input = document.getElementsByName("description")[0].value;
		var previous_article_input = document.getElementsByName("previous_article")[0].value;
		var next_article_input = document.getElementsByName("next_article")[0].value;
		//var content_input = document.getElementsByClassName("ql-editor")[0];
		console.log(name_input + " " +  article_date_input + " " + description_input);
		this.setState( { article: { name: name_input, article_date: article_date_input, description: description_input, previous_article: previous_article_input, next_article: next_article_input } });
		console.log("This: " + this.state.article.description);
		//this.setState( { article: { article_date: article_date_input.value } });
		//this.setState( { article: { description: description_input.value } });
		//this.setState( { article: { content: content_input.value } });
	}

	populateInputFields() {
		//For populating input fields. 
		var name_input = document.getElementsByName("name")[0];
		var article_date_input = document.getElementsByName("article_date")[0];
		var description_input = document.getElementsByName("description")[0];
		var previous_article_input = document.getElementsByName("previous_article")[0];
		var next_article_input = document.getElementsByName("next_article")[0];
		var content_input = document.getElementsByClassName("ql-editor")[0];

		name_input.value = this.state.article.name;
		article_date_input.value = this.state.article.article_date;
		description_input.value = this.state.article.description;
		previous_article_input.value = this.state.article.previous_article;
		next_article_input.value = this.state.article.next_article;
		content_input.innerHTML = this.state.article.content;
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		this.getDataFromApi();
	    //For initializing Quill editor: http://jsplanet.net/plugin/1069/javascript/quill
	    const scriptElement = document.createElement("script");
	    const rawScript = "var toolbarOptions = [['bold', 'italic'], ['link', 'image'],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],['blockquote', 'code-block'],[{ 'color': [] }, { 'background': [] }],['showHtml']];\nvar editor = new Quill('#editor', { modules: { toolbar: toolbarOptions }, theme: 'snow' });var txtArea = document.createElement('textarea'); txtArea.style.cssText = 'width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none'; var htmlEditor = editor.addContainer('ql-custom'); htmlEditor.appendChild(txtArea); var myEditor = document.querySelector('#editor');editor.on('text-change', (delta, oldDelta, source) => { var html = myEditor.children[0].innerHTML;txtArea.value = html }); var customButton = document.querySelector('.ql-showHtml');customButton.addEventListener('click', function() { if (txtArea.style.display === '') { var html = txtArea.value;self.editor.pasteHTML(html);} txtArea.style.display = txtArea.style.display === 'none' ? '' : 'none';});";
	    const scriptNode = document.createTextNode(rawScript);
	    scriptElement.appendChild(scriptNode);
	    document.body.appendChild(scriptElement);
	}
  
	render() {
		return(
		  <form className="ta-input-block" onSubmit={this.handleUpdate.bind(this)}>
		  	<div className="ta-top-half-edit">
			    <div className="ta-top-input">
			      <div className="form-group ta-left">
			        <input type="text"
			               className="form-control"
			               name="name"
			               placeholder="Name"

			               
			               onChange={this.handleChange.bind(this)} />
			      </div>
			      <div className="form-group ta-right">
			        <input type="date"
			               className="form-control"
			               name="article_date"
			               placeholder="Article Date"

			               
			               onChange={this.handleChange.bind(this)} />
			      </div>
			    </div>

			    <div className="ta-top-input ta-clear-both">
			      <div className="form-group ta-left">
			        <input type="text"
			               className="form-control"
			               name="previous_article"
			               placeholder="Previous Article Name"

			               
			               onChange={this.handleChange.bind(this)} />
			      </div>
			      <div className="form-group ta-right">
			        <input type="text"
			               className="form-control"
			               name="next_article"
			               placeholder="Next Article Name"

			               
			               onChange={this.handleChange.bind(this)} />
			      </div>
			    </div>
		    </div>

		    <div className="ta-bottom-input">
		      <div className="form-group">
		        <input type="text"
		               className="form-control"
		               name="description"
		               placeholder="Description"

		               
		               onChange={this.handleChange.bind(this)} />
		      </div>
		    </div>

		    <div id="toolbar" className="ta-quill-toolbar">

		    </div>

		    <div id="editor" className="ta-quill-textbox" name="content"  >
		      <p id="richText"></p>
		    </div>

		    <button type="submit" className="btn btn-primary">Submit</button>
		  </form>
		)
	}
};