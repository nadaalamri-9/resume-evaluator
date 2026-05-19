// TODO Day 1: build the header with the app name and Login/Register links
// TODO Day 4: replace <a href> with <Link to> from react-router-dom

export default function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>

      <h1>Resume Evaluator</h1>
      <nav>
        <a href="#">Login</a>
        <a href="#">Register</a>
      </nav>

    </header>
  );
}
