class DirectionButtons extends React.Component{
	
	constructor(props){
		super(props); 
		this.state = props;
	}

	render () {

        if (this.state.previous_article && this.state.next_article) {
            var previousArticleLink = "/article?name=" + this.state.previous_article;
            var nextArticleLink = "/article?name=" + this.state.next_article;
            return (
                <nav className="blog-pagination">
                  <span><a id="ta-previous" href={previousArticleLink}>Previous</a></span>
                  <span><a id="ta-next" href={nextArticleLink}>Next</a></span>
                </nav>
            )
        }
        else if (this.state.previous_article && !this.state.next_article) {
            var previousArticleLink = "/article?name=" + this.state.previous_article;
            return (
                <nav className="blog-pagination">
                  <span><a id="ta-previous" href={previousArticleLink}>Previous</a></span>
                  <span id="ta-next">Next</span>
                </nav>
            )
        }
        else if (!this.state.previous_article && this.state.next_article) {
            var nextArticleLink = "/article?name=" + this.state.next_article;
            return (
                <nav className="blog-pagination">
                  <span id="ta-previous">Previous</span>
                  <span><a id="ta-next" href={nextArticleLink}>Next</a></span>
                </nav>
            )
        } else {
            return (
                <nav className="blog-pagination">
                    <span id="ta-previous">Previous</span>
                    <span id="ta-next">Next</span>
                </nav>
            )
        }


	}
}