import { useEffect, useState } from "react";
import axios from "axios"
import Footer from "./Footer"
import Header from "./Header";

const Home = () => {
    const [priceData, setPriceData] = useState()
    const [showMore, setShowMore] = useState(0)
    const [term, setTerm] = useState("/balance")
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${term}?offset=${showMore}`)
            .then(result => { setPriceData(result.data.data)
                setDisable(result.data.endOfLength) })
            .catch(err => console.log(err))
    }, [term, showMore])

/*     useEffect(() => {
        async function getPriceData() {
            try {
                let {result} = await axios.get(`${term}?offset=${showMore}`);
                setPriceData(result.data.data);
                setDisable(result.data.endOfLength)
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            }
        }
        getPriceData();
    }, [term, showMore]); */
    
    const handleMore = () => {
        setShowMore(prev => prev + 7)
    }

    const deleteTransfer = (id) => {
        axios.delete(`/input/${id}`)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        setPriceData(prev => prev.filter(el => el.id !== id))
    }
  
    return (<>
        <Header title="Übersicht" />
        <main>
            <section className="overview">
                <div className="overviewHead">
                    <h3>Letzte Transaktionen</h3>
                    <button onClick={() => setTerm("/balance/all")}>Show full</button>
                </div>
                <ul>
                    {priceData && priceData.map((transfer) => <li key={transfer.id}>
                        <div style={{ width: "35px", height: "35px", borderRadius: "50%", backgroundColor: transfer.category === "Einnahmen" ? "#00FF00" : "#F63535" }}></div>
                        <article>
                            <h4>{transfer.description}</h4>
                            <p>{transfer.created_at}</p>
                        </article>
                        <p className="price">{transfer.price}</p>
                        <img src="./img/delete.png" alt="delete"
                            style={{ height: "25px" }}
                            onClick={() => deleteTransfer(transfer.id)} />
                    </li>)}
                </ul>
                <div className="buttonM">
                    <button className="buttonMore" onClick={handleMore} disabled={disable}>MEHR TRANSAKTIONEN</button>
                </div>
            </section>
        </main>
        <Footer />
    </>);
}

export default Home;
