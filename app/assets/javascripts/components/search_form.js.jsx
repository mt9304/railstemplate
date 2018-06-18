class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props)
    {
      this.setState(nextProps);
    }
  }

  render() {
    return (
    	<div>
	    	<input type="text" value={this.state.value} onChange={this.state.onChange} />
	    	<div className="row"></div>
	    	<br/>
    	</div>
      );
  }
}
