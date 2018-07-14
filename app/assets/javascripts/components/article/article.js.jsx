class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  handleDelete(e) {
    
    if (confirm('Are you sure you want to delete article: ' + this.state.item.name+'?')) {
      var self = this;
      var articleId = this.state.item.id;
      e.preventDefault();

      $.ajax({
        method: 'DELETE',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        url: '/api/articles/' + articleId,
        success: function(data) {
          //self.props.handleDeleteRecord(self.props.item);
          location.reload();
        }.bind(this),
        error: function(xhr, status, error) {
          alert('Cannot delete requested record: xhr: '+xhr+' status: '+status+' error: '+error, status);
        }
      });
    } else {
      console.log('Cancelled delete action. ');
    }
  }


  render() {
    var articleLink = "/article?name=" + this.state.item.name;
    if (this.state.isAdmin)
    {
      return (
          <tr>
            <td><a className="ta-white" href={articleLink}>{this.state.item.name}</a></td>
            <td>{this.state.item.article_date}</td>
            <td>{this.state.item.description}</td>
            <td>          
            <a className="btn btn-danger btn-xs"
             onClick={this.handleDelete.bind(this)} >
            Delete</a>
            </td>
          </tr>
      );
    }
    else
    {
      return (
          <tr>
            <td><a className="ta-white" href={articleLink}>{this.state.item.name}</a></td>
            <td>{this.state.item.article_date}</td>
            <td>{this.state.item.description}</td>
          </tr>
      );
    }
  }
}