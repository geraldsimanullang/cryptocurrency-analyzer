import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function MyPortfolio({serverUrl}) {

  const [portfolios, setPortfolios] = useState([]);
  const [notes, setNotes] = useState("")

  async function fetchPortfolios() {
    try {
      const { data } = await axios.get(`${serverUrl}/my-portfolio`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      setPortfolios(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEditNotes(event, portfolioId) {
    try {
      event.preventDefault()

      const body = { notes }

      const { data } = await axios.patch(`${serverUrl}/portfolio/${portfolioId}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  async function handleDeletePortfolio(portfolioId) {
    try {

      await axios.delete(`${serverUrl}/portfolio/${portfolioId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });

      console.log("delete success")

      fetchPortfolios()

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPortfolios()
  }, [])


  return (
    <div className="flex flex-col min-h-screen w-screen bg-slate-50">
      <Navbar />
      <div className="flex justify-center mt-10">
        <table className="table text-black w-fit">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th>My Portfolio</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {portfolios.map((portfolio) => {
              return (
                <>
                  <tr>
                    <td>
                      <img src={portfolio.Coin.imgUrl} className="w-10 h-10" key={portfolio.id}/>
                    </td>
                    <td>
                      <p className="text-black">{portfolio.Coin.name}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <form onSubmit={(event) => handleEditNotes(event, portfolio.id)}
                          className="flex items-center gap-2">
                          <textarea
                            onChange={(event) => { setNotes(event.target.value); }}
                            className="bg-white text-black text-xs border-2 w-96 h-16"
                          >{portfolio.notes || ""}</textarea>

                          <button type="submit" className="btn btn-info btn-sm">Save Notes</button>
                        </form>
                        <button className="btn btn-error btn-sm" onClick={() => handleDeletePortfolio(portfolio.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}