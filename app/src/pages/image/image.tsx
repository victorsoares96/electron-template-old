import img from '@src/assets/testimage.png';

function Image() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">Loading images</h1>
      </div>
      <div className="container mt-2">
        This page is to demonstrate that we can load an image hosted from a
        directory in our project.
      </div>
      <div className="container mt-2">
        <img src={img} />
      </div>
    </section>
  );
}

export default Image;
