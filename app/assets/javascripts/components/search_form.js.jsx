class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
    	<div>
	    	<input type="text" value={this.state.search} />
	    	<div className="row"></div>
	    	<br/>
    	</div>
      );
  }
}
