function Article({ article }) {
	const { name, date, description, content } = article;
  return (
      <tr>
        <td>{article.name}</td>
        <td>{article.date}</td>
        <td>{article.description}</td>
        <td>{article.content}</td>
      </tr>
  );
}
Article.propTypes = {
  article: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
  })
};