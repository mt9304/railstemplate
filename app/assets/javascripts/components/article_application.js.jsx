function ArticleApplication() {
    return (
      <div className='container'>
        <div className='jumbotron'>
          <h1>Documentation Center</h1>
          <p>by MT</p>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <ArticleTable />
          </div>
        </div>
      </div>
      );
}
