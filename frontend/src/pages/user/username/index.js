import { Outlet, Link, useParams } from "react-router-dom";
const Profile = () => {
   // TODO: fetch user sets. If res status is 400, render NotFoundPage
            return ( 
                <>
                    <div className="profile-nav">
                        <Link to="decks">Decks</Link>
                        <Link to="folders">Folders</Link>
                    </div>
                    <Outlet/>
                </>
             );
  
}
 
export default Profile;