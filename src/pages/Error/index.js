import { Link } from "react-router-dom";
import './error.css'

function Error() {
    return(
        <div className="error">
            <h1>Ops, parece que essa página não existe!</h1>
            <br/>
            <span>Encontramos essa página:</span> <br/>
            <Link to={"/cartazflix"} className="error-link">Home</Link>
        </div>
    );
};

export default Error;