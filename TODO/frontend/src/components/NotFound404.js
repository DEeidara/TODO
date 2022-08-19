import { useLocation } from "react-router-dom";

const NotFound404 = () => {
    let { pathname } = useLocation();
    return(
        <div>
            <h2>The page at the address {pathname} was not found</h2>
        </div>
    )
}

export default NotFound404;