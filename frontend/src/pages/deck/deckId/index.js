import { Link, useLocation } from "react-router-dom";

const Deck = () => {
    const {pathname} = useLocation();
    return ( 
        <>
            <div className="deck-header">
                <Link to={`${pathname}/study`}>Study</Link>
                <Link to={`${pathname}/edit`}>Edit</Link>
            </div>
            <div className="deck-main">
                cards
            </div>
        </>
     );
}
 
export default Deck;