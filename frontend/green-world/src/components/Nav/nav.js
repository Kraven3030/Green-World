import './nav.css'


function Nav({ isLoggedIn }) {
    return (
        <>
            {isLoggedIn && (
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Green World</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mynavbar">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Account</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">About</a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="text" placeholder="Search for chargers" />
                                <button className="btn btn-light" type="button">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Nav;
