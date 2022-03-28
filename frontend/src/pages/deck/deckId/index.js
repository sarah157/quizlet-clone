import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useFetch } from "../../../hooks/use-fetch";
import { getDeck } from "../../../services/deckService";

import CardPreview from "../../../components/card/CardPreview";

const Deck = () => {
    const { func: _getDeck, data: deck, loading, error } = useFetch(getDeck);

    useEffect(() => {
        _getDeck(pathname.split("/")[2])
    }, []);

    const { pathname } = useLocation();
    return (
        <>
            {loading && <p>LOADING</p>}
            {error && <p>ERROR</p>}
            {!loading && !error &&
                <>
                    <div className="deck-header">
                        <p>{deck?.title || "loading"}</p>
                        <Link to={`${pathname}/study`}>Study</Link>
                        <Link to={`${pathname}/edit`}>Edit</Link>
                    </div>
                    <div className="deck-main">
                        <div className="deck-cards-preview">
                            {deck.cards.map(card => (
                                <CardPreview card={card}/>
                            ))}
                        </div>
                    </div>
             </>}
        </>
    );
}

export default Deck;