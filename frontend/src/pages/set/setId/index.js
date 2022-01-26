import { Link, useLocation } from "react-router-dom";

const SetHome = () => {
    const {pathname} = useLocation();
    return ( 
        <>
            <div className="set-header">
                <Link to={`${pathname}/study`}>Study</Link>
                <Link to={`${pathname}/edit`}>Edit</Link>
            </div>
            <div className="set-main">
                cards
            </div>
        </>
     );
}
 
export default SetHome;