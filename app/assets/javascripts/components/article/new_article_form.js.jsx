class NewArticleForm extends React.Component {

  constructor(props) {
  	super(props);
	this.state = { name: "", article_date: "", description: "", content: "", tags: "" }; 
  //console.log(this.state.name);
  }

  isValidForm() {
    if (this.state.name && this.state.article_date && 
        this.state.description) {
      return true;
    } else {
      return false;
    }
  }

  handleAdd(e) {
    //For getting Quill HTML content. 
    var richTextNode = document.getElementsByClassName('ql-editor')[0];
    htmlContent = richTextNode.innerHTML;
    this.setState({content: "htmlContent"});
    //console.log(htmlContent);

    e.preventDefault();
    var self = this;
    var current_state = this.state;
    current_state.content = htmlContent;
    if (this.isValidForm()) {
    //if (true) {
      $.ajax({
        url: '/api/articles',
        method: 'POST',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: { article: current_state },
        success: function(data) {
          //console.log("Adding Record " + current_state);
          //self.props.handleAdd(data);
          //console.log("Adding Record2");
          self.setState({ name: "", article_date: "", description: "", content: "", tags: "" });
          richTextNode.innerHTML = "";
          console.log("Post created successfully");
          //Add flash message here. 
        },
        error: function(xhr, status, error) {
          alert('Cannot add a new record: ' + self.state.name , status);
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

  componentDidMount() {
    //For initializing Quill editor: http://jsplanet.net/plugin/1069/javascript/quill
    const scriptElement = document.createElement("script");
    const rawScript = "var toolbarOptions = [['bold', 'italic'], ['link', 'image'],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],['blockquote', 'code-block'],[{ 'color': [] }, { 'background': [] }],['showHtml']];\nvar editor = new Quill('#editor', { modules: { toolbar: toolbarOptions }, theme: 'snow' });var txtArea = document.createElement('textarea'); txtArea.style.cssText = 'width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none'; var htmlEditor = editor.addContainer('ql-custom'); htmlEditor.appendChild(txtArea); var myEditor = document.querySelector('#editor');editor.on('text-change', (delta, oldDelta, source) => { var html = myEditor.children[0].innerHTML;txtArea.value = html }); var customButton = document.querySelector('.ql-showHtml');customButton.addEventListener('click', function() { if (txtArea.style.display === '') { var html = txtArea.value;self.editor.pasteHTML(html);} txtArea.style.display = txtArea.style.display === 'none' ? '' : 'none';});";
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