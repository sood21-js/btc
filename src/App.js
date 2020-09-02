import React, { useEffect, useState } from 'react';
import './App.css';
import Select from './components/select';
import Input from './components/input';
const axios = require('axios');

const APY_KEY = 'af5ca86ab695c18304b7d1f990731651ff72239be080a5acc9ff87193d735658'
const App = () => {
  const [list, setList] = useState([])
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [minMount, setMinMount] = useState(0)
  const [mount, setMount] = useState(0)
  const [estimatedAmount, setEstimatedAmount] = useState('')
  useEffect(() => {
    axios.get('https://changenow.io/api/v1/currencies?active=true')
      .then(res => {
        setList(res.data)
        setTo(res.data[0].ticker)
        setFrom(res.data[0].ticker)
      })
  }, [])


  useEffect(() => {
    if (to && from && to !== from) {
      axios.get(`https://changenow.io/api/v1/min-amount/${to}_${from}`)
        .then(res => {
          setMinMount(res.data.minAmount)
          setMount(res.data.minAmount)
        })
    }
  }, [to, from])

  useEffect(() => {
    if (to && from && minMount && to !== from) {
      if (minMount > (+mount)) {
        setEstimatedAmount('-')
      } else if (!isNaN(+mount)) {
        axios.get(`https://changenow.io/api/v1/exchange-amount/${mount}/${to}_${from}?${APY_KEY}=changenow`)
          .then(res => {
            setEstimatedAmount(res.data.estimatedAmount)
          })
      }
    } else if (to === from) {
      setEstimatedAmount(mount)
    }
  }, [mount])

  const clickHandler = () => {
    const newTo = from
    const newFrom = to
    const newMinMountn = estimatedAmount
    setTo(newTo)
    setFrom(newFrom)
    setMinMount(newMinMountn)
  }

  const changeHandler = (e) => {
    setMount(e.target.value)
  }

  const changeFrom = () => {
    let number
    if (list.length > 0) {
      list.forEach((e, index) => {
        if (e.ticker === from) {
          number = index
        }
      })
      if ((number + 1) <= list.length) {
        setFrom(list[number + 1].ticker)
      } else setFrom(list[0].ticker)
    }
  }

  return (
    <div className="app">
      <div className="container">

        <div className="row">

          <div className="item1">
            <Input
              value={mount}
              onChange={changeHandler}
            />
            <Select
              list={list}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div onClick={clickHandler}><i className="fas fa-exchange-alt"></i></div>
          <div className="item2">
            <Input
              value={estimatedAmount}
              disabled={true}
            />
            <Select
              list={list}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

        </div>

        <div className="row2">
          <div className="row w100">
            <div className="item2">
              <div className="input w100">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="btn">
            <button onClick={changeFrom}>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
