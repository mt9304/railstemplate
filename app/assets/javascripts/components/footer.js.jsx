class Footer extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = props;
  }

	render() {
		return (
          <footer className="blog-footer">
            <p>Domain Name, 2018</p>
            <p>
              <a href="#">Back to top</a>
            </p>
          </footer>
		)
	}
}