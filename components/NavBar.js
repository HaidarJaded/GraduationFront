export default function NavBar(){
    return(
        <>
            <nav style={{
                backgroundColor: "#333",
                padding: "10px",
            }}>
                <ul style={{listStyle: 'none',
                    display: 'flex'
                }}>
                    <li style={{
                        marginRight: '10px',
                        color:"white"
                    }}>
                        Link
                    </li>
                    <li style={{
                        marginRight: '10px',
                        color:"white"
                    }}>
                      About
                    </li>
                    {/* Add more navigation links as needed */}
                </ul>
            </nav>
        </>
    );
}