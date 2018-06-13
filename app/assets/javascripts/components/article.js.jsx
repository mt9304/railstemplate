const Article = ({item}) => (
      <tr>
        <td>{item.name}</td>
        <td>{item.article_date}</td>
        <td>{item.description}</td>
        <td>{item.content}</td>
      </tr>
  )