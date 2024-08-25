import "./App.css";
import { FormComponent } from "./component/form";
import OutputDisplay from "./component/outdisplay";
function App() {
  return (
    <>
      <FormComponent />
      <h2>API Link:</h2>
      <a href="http://13.235.132.143:3000/bfhl">Deployed on AWS</a>
    </>
  );
}

export default App;
