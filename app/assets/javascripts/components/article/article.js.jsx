class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  handleDelete(e) {

    var self = this;
    var articleId = this.state.item.id;
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: '/api/articles/' + articleId,
      success: function(data) {
        self.props.handleDeleteRecord(self.props.item);
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot delete requested record: xhr: '+xhr+' status: '+status+' error: '+error, status);
      }
    });
  }


  render() {
    return (
          <tr>
            <td>{this.state.item.name}</td>
            <td>{this.state.item.article_date}</td>
            <td>{this.state.item.description}</td>
            <td>          
            <a className="btn btn-danger btn-xs"
             onClick={this.handleDelete.bind(this)} >
            Delete</a>
            </td>
          </tr>
  )} 
}