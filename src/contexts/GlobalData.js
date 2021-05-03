import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect, useState } from 'react'
import { client } from '../apollo/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useTimeframe } from './Application'
import {
  getPercentChange,
  getBlockFromTimestamp,
  getBlocksFromTimestamps,
  get2DayPercentChange,
  getTimeframe,
} from '../utils'
import {
  GLOBAL_DATA,
  GLOBAL_TXNS,
  GLOBAL_CHART,
  ETH_PRICE,
  LINK_PRICE,
  YFL_PRICE,
  SYFL_PRICE,
  YFLUSD_PRICE,
  ALL_PAIRS,
  ALL_TOKENS,
  TOP_LPS_PER_PAIRS,
} from '../apollo/queries'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useAllPairData } from './PairData'
const UPDATE = 'UPDATE'
const UPDATE_TXNS = 'UPDATE_TXNS'
const UPDATE_CHART = 'UPDATE_CHART'
const UPDATE_ETH_PRICE = 'UPDATE_ETH_PRICE'
const UPDATE_LINK_PRICE = 'UPDATE_LINK_PRICE'
const UPDATE_SYFL_PRICE = 'UPDATE_SYFL_PRICE'
const UPDATE_YFL_PRICE = 'UPDATE_YFL_PRICE'
const UPDATE_YFLUSD_PRICE = 'UPDATE_YFLUSD_PRICE'
const ETH_PRICE_KEY = 'ETH_PRICE_KEY'
const LINK_PRICE_KEY = 'LINK_PRICE_KEY'
const YFL_PRICE_KEY = 'YFL_PRICE_KEY'
const SYFL_PRICE_KEY = 'SYFL_PRICE_KEY'
const YFLUSD_PRICE_KEY = 'YFLUSD_PRICE_KEY'
const UPDATE_ALL_PAIRS_IN_VAREN = 'UPDAUPDATE_ALL_PAIRS_IN_VARENTE_TOP_PAIRS'
const UPDATE_ALL_TOKENS_IN_VAREN = 'UPDATE_ALL_TOKENS_IN_VAREN'
const UPDATE_TOP_LPS = 'UPDATE_TOP_LPS'

// format dayjs with the libraries that we need
dayjs.extend(utc)
dayjs.extend(weekOfYear)

const GlobalDataContext = createContext()

function useGlobalDataContext() {
  return useContext(GlobalDataContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const { data } = payload
      return {
        ...state,
        globalData: data,
      }
    }
    case UPDATE_TXNS: {
      const { transactions } = payload
      return {
        ...state,
        transactions,
      }
    }
    case UPDATE_CHART: {
      const { daily, weekly } = payload
      return {
        ...state,
        chartData: {
          daily,
          weekly,
        },
      }
    }

    case UPDATE_ETH_PRICE: {
      const { ethPrice, ethOneDayPrice, ethPriceChange } = payload
      return {
        ...state,
        [ETH_PRICE_KEY]: ethPrice,
        ethOneDayPrice,
        ethPriceChange,
      }
    }

    case UPDATE_LINK_PRICE: {
      const { linkPrice, linkOneDayPrice, linkPriceChange } = payload
      return {
        ...state,
        [LINK_PRICE_KEY]: linkPrice,
        linkOneDayPrice,
        linkPriceChange,
      }
    }

    case UPDATE_YFL_PRICE: {
      const { yflPrice, yflOneDayPrice, yflPriceChange } = payload
      return {
        ...state,
        [YFL_PRICE_KEY]: yflPrice,
        yflOneDayPrice,
        yflPriceChange,
      }
    }

    case UPDATE_SYFL_PRICE: {
      const { syflPrice, syflOneDayPrice, syflPriceChange } = payload
      return {
        ...state,
        [SYFL_PRICE_KEY]: syflPrice,
        syflOneDayPrice,
        syflPriceChange,
      }
    }

    case UPDATE_YFLUSD_PRICE: {
      const { yflusdPrice, yflusdOneDayPrice, yflusdPriceChange } = payload
      return {
        ...state,
        [YFLUSD_PRICE_KEY]: yflusdPrice,
        yflusdOneDayPrice,
        yflusdPriceChange,
      }
    }

    case UPDATE_ALL_PAIRS_IN_VAREN: {
      const { allPairs } = payload
      return {
        ...state,
        allPairs,
      }
    }

    case UPDATE_ALL_TOKENS_IN_VAREN: {
      const { allTokens } = payload
      return {
        ...state,
        allTokens,
      }
    }

    case UPDATE_TOP_LPS: {
      const { topLps } = payload
      return {
        ...state,
        topLps,
      }
    }
    default: {
      throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {})
  const update = useCallback((data) => {
    dispatch({
      type: UPDATE,
      payload: {
        data,
      },
    })
  }, [])

  const updateTransactions = useCallback((transactions) => {
    dispatch({
      type: UPDATE_TXNS,
      payload: {
        transactions,
      },
    })
  }, [])

  const updateChart = useCallback((daily, weekly) => {
    dispatch({
      type: UPDATE_CHART,
      payload: {
        daily,
        weekly,
      },
    })
  }, [])

  const updateEthPrice = useCallback((ethPrice, ethOneDayPrice, ethPriceChange) => {
    dispatch({
      type: UPDATE_ETH_PRICE,
      payload: {
        ethPrice,
        ethOneDayPrice,
        ethPriceChange,
      },
    })
  }, [])

  const updateLinkPrice = useCallback((linkPrice, linkOneDayPrice, linkPriceChange) => {
    dispatch({
      type: UPDATE_LINK_PRICE,
      payload: {
        linkPrice,
        linkOneDayPrice,
        linkPriceChange,
      },
    })
  }, [])

  const updateYflPrice = useCallback((yflPrice, yflOneDayPrice, yflPriceChange) => {
    dispatch({
      type: UPDATE_YFL_PRICE,
      payload: {
        yflPrice,
        yflOneDayPrice,
        yflPriceChange,
      },
    })
  }, [])

  const updateSYflPrice = useCallback((syflPrice, syflOneDayPrice, syflPriceChange) => {
    dispatch({
      type: UPDATE_SYFL_PRICE,
      payload: {
        syflPrice,
        syflOneDayPrice,
        syflPriceChange,
      },
    })
  }, [])

  const updateYflusdPrice = useCallback((yflusdPrice, yflusdOneDayPrice, yflusdPriceChange) => {
    dispatch({
      type: UPDATE_YFLUSD_PRICE,
      payload: {
        yflusdPrice,
        yflusdOneDayPrice,
        yflusdPriceChange,
      },
    })
  }, [])

  const updateAllPairsInDarkHorse = useCallback((allPairs) => {
    dispatch({
      type: UPDATE_ALL_PAIRS_IN_VAREN,
      payload: {
        allPairs,
      },
    })
  }, [])

  const updateAllTokensInDarkHorse = useCallback((allTokens) => {
    dispatch({
      type: UPDATE_ALL_TOKENS_IN_VAREN,
      payload: {
        allTokens,
      },
    })
  }, [])

  const updateTopLps = useCallback((topLps) => {
    dispatch({
      type: UPDATE_TOP_LPS,
      payload: {
        topLps,
      },
    })
  }, [])
  return (
    <GlobalDataContext.Provider
      value={useMemo(
        () => [
          state,
          {
            update,
            updateTransactions,
            updateChart,
            updateEthPrice,
            updateLinkPrice,
            updateYflPrice,
            updateSYflPrice,
            updateYflusdPrice,
            updateTopLps,
            updateAllPairsInDarkHorse,
            updateAllTokensInDarkHorse,
          },
        ],
        [
          state,
          update,
          updateTransactions,
          updateTopLps,
          updateChart,
          updateEthPrice,
          updateLinkPrice,
          updateYflPrice,
          updateSYflPrice,
          updateYflusdPrice,
          updateAllPairsInDarkHorse,
          updateAllTokensInDarkHorse,
        ]
      )}
    >
      {children}
    </GlobalDataContext.Provider>
  )
}

/**
 * Gets all the global data for the overview page.
 * Needs current eth price and the old eth price to get
 * 24 hour USD changes.
 * @param {*} ethPrice
 * @param {*} oldEthPrice
 */
async function getGlobalData(ethPrice, oldEthPrice) {
  // data for each day , historic data used for % changes
  let data = {}
  let oneDayData = {}
  let twoDayData = {}

  try {
    // get timestamps for the days
    const utcCurrentTime = dayjs()
    const utcOneDayBack = utcCurrentTime.subtract(1, 'day').unix()
    const utcTwoDaysBack = utcCurrentTime.subtract(2, 'day').unix()
    const utcOneWeekBack = utcCurrentTime.subtract(1, 'week').unix()
    const utcTwoWeeksBack = utcCurrentTime.subtract(2, 'week').unix()

    // get the blocks needed for time travel queries
    let [oneDayBlock, twoDayBlock, oneWeekBlock, twoWeekBlock] = await getBlocksFromTimestamps([
      utcOneDayBack,
      utcTwoDaysBack,
      utcOneWeekBack,
      utcTwoWeeksBack,
    ])

    // fetch the global data
    let result = await client.query({
      query: GLOBAL_DATA(),
      fetchPolicy: 'cache-first',
    })
    data = result.data.linkswapFactories[0]

    // fetch the historical data
    let oneDayResult = await client.query({
      query: GLOBAL_DATA(oneDayBlock?.number),
      fetchPolicy: 'cache-first',
    })
    oneDayData = oneDayResult.data.linkswapFactories[0]

    let twoDayResult = await client.query({
      query: GLOBAL_DATA(twoDayBlock?.number),
      fetchPolicy: 'cache-first',
    })
    twoDayData = twoDayResult.data.linkswapFactories[0]

    let oneWeekResult = await client.query({
      query: GLOBAL_DATA(oneWeekBlock?.number),
      fetchPolicy: 'cache-first',
    })
    const oneWeekData = oneWeekResult.data.linkswapFactories[0]

    let twoWeekResult = await client.query({
      query: GLOBAL_DATA(twoWeekBlock?.number),
      fetchPolicy: 'cache-first',
    })
    const twoWeekData = twoWeekResult.data.linkswapFactories[0]

    if (data && oneDayData && twoDayData && twoWeekData) {
      let [oneDayVolumeUSD, volumeChangeUSD] = get2DayPercentChange(
        data.totalVolumeUSD,
        oneDayData.totalVolumeUSD ? oneDayData.totalVolumeUSD : 0,
        twoDayData.totalVolumeUSD ? twoDayData.totalVolumeUSD : 0
      )

      const [oneWeekVolume, weeklyVolumeChange] = get2DayPercentChange(
        data.totalVolumeUSD,
        oneWeekData.totalVolumeUSD,
        twoWeekData.totalVolumeUSD
      )

      const [oneDayTxns, txnChange] = get2DayPercentChange(
        data.txCount,
        oneDayData.txCount ? oneDayData.txCount : 0,
        twoDayData.txCount ? twoDayData.txCount : 0
      )

      // format the total liquidity in USD
      data.totalLiquidityUSD = data.totalLiquidityETH * ethPrice
      const liquidityChangeUSD = getPercentChange(
        data.totalLiquidityETH * ethPrice,
        oneDayData.totalLiquidityETH * oldEthPrice
      )

      // add relevant fields with the calculated amounts
      data.oneDayVolumeUSD = oneDayVolumeUSD
      data.oneWeekVolume = oneWeekVolume
      data.weeklyVolumeChange = weeklyVolumeChange
      data.volumeChangeUSD = volumeChangeUSD
      data.liquidityChangeUSD = liquidityChangeUSD
      data.oneDayTxns = oneDayTxns
      data.txnChange = txnChange
    }
  } catch (e) {
    console.log(e)
  }

  return data
}

/**
 * Get historical data for volume and liquidity used in global charts
 * on main page
 * @param {*} oldestDateToFetch // start of window to fetch from
 */
const getChartData = async (oldestDateToFetch) => {
  let data = []
  let weeklyData = []
  const utcEndTime = dayjs.utc()
  let skip = 0
  let allFound = false

  try {
    while (!allFound) {
      let result = await client.query({
        query: GLOBAL_CHART,
        variables: {
          startTime: oldestDateToFetch,
          skip,
        },
        fetchPolicy: 'cache-first',
      })
      skip += 1000
      data = data.concat(result.data.linkswapDayDatas)
      if (result.data.linkswapDayDatas.length < 1000) {
        allFound = true
      }
    }

    if (data) {
      let dayIndexSet = new Set()
      let dayIndexArray = []
      const oneDay = 24 * 60 * 60

      // for each day, parse the daily volume and format for chart array
      data.forEach((dayData, i) => {
        // add the day index to the set of days
        dayIndexSet.add((data[i].date / oneDay).toFixed(0))
        dayIndexArray.push(data[i])
        dayData.dailyVolumeUSD = parseFloat(dayData.dailyVolumeUSD)
      })

      // fill in empty days ( there will be no day datas if no trades made that day )
      let timestamp = data[0].date ? data[0].date : oldestDateToFetch
      let latestLiquidityUSD = data[0].totalLiquidityUSD
      let latestDayDats = data[0].mostLiquidTokens
      let index = 1
      while (timestamp < utcEndTime.unix() - oneDay) {
        const nextDay = timestamp + oneDay
        let currentDayIndex = (nextDay / oneDay).toFixed(0)
        if (!dayIndexSet.has(currentDayIndex)) {
          data.push({
            date: nextDay,
            dailyVolumeUSD: 0,
            totalLiquidityUSD: latestLiquidityUSD,
            mostLiquidTokens: latestDayDats,
          })
        } else {
          latestLiquidityUSD = dayIndexArray[index].totalLiquidityUSD
          latestDayDats = dayIndexArray[index].mostLiquidTokens
          index = index + 1
        }
        timestamp = nextDay
      }
    }

    // format weekly data for weekly sized chunks
    data = data.sort((a, b) => (parseInt(a.date) > parseInt(b.date) ? 1 : -1))
    let startIndexWeekly = -1
    let currentWeek = -1
    data.forEach((entry, i) => {
      const week = dayjs.utc(dayjs.unix(data[i].date)).week()
      if (week !== currentWeek) {
        currentWeek = week
        startIndexWeekly++
      }
      weeklyData[startIndexWeekly] = weeklyData[startIndexWeekly] || {}
      weeklyData[startIndexWeekly].date = data[i].date
      weeklyData[startIndexWeekly].weeklyVolumeUSD =
        (weeklyData[startIndexWeekly].weeklyVolumeUSD ?? 0) + data[i].dailyVolumeUSD
    })
  } catch (e) {
    console.log(e)
  }
  return [data, weeklyData]
}

/**
 * Get and format transactions for global page
 */
const getGlobalTransactions = async () => {
  let transactions = {}

  try {
    let result = await client.query({
      query: GLOBAL_TXNS,
      fetchPolicy: 'cache-first',
    })
    transactions.mints = []
    transactions.burns = []
    transactions.swaps = []
    result?.data?.transactions &&
      result.data.transactions.map((transaction) => {
        if (transaction.mints.length > 0) {
          transaction.mints.map((mint) => {
            return transactions.mints.push(mint)
          })
        }
        if (transaction.burns.length > 0) {
          transaction.burns.map((burn) => {
            return transactions.burns.push(burn)
          })
        }
        if (transaction.swaps.length > 0) {
          transaction.swaps.map((swap) => {
            return transactions.swaps.push(swap)
          })
        }
        return true
      })
  } catch (e) {
    console.log(e)
  }

  return transactions
}

/**
 * Gets the current price  of ETH, 24 hour price, and % change between them
 */
const getEthPrice = async () => {
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix()

  let ethPrice = 0
  let ethPriceOneDay = 0
  let priceChangeETH = 0

  try {
    let oneDayBlock = await getBlockFromTimestamp(utcOneDayBack)
    let result = await client.query({
      query: ETH_PRICE(),
      fetchPolicy: 'cache-first',
    })
    let resultOneDay = await client.query({
      query: ETH_PRICE(oneDayBlock),
      fetchPolicy: 'cache-first',
    })
    const currentPrice = result?.data?.bundles[0]?.ethPrice
    const oneDayBackPrice = resultOneDay?.data?.bundles[0]?.ethPrice
    priceChangeETH = getPercentChange(currentPrice, oneDayBackPrice)
    ethPrice = currentPrice
    ethPriceOneDay = oneDayBackPrice
  } catch (e) {
    console.log(e)
  }

  return [ethPrice, ethPriceOneDay, priceChangeETH]
}

/**
 * Gets the current price  of LINK, 24 hour price, and % change between them
 */
const getLinkPrice = async () => {
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix()

  let linkPrice = 0
  let linkPriceOneDay = 0
  let priceChangeLINK = 0

  try {
    let oneDayBlock = await getBlockFromTimestamp(utcOneDayBack)
    let result = await client.query({
      query: LINK_PRICE(),
      fetchPolicy: 'cache-first',
    })
    let resultOneDay = await client.query({
      query: LINK_PRICE(oneDayBlock),
      fetchPolicy: 'cache-first',
    })
    const currentPrice = result?.data?.bundles[0]?.linkPrice
    const oneDayBackPrice = resultOneDay?.data?.bundles[0]?.linkPrice
    priceChangeLINK = getPercentChange(currentPrice, oneDayBackPrice)
    linkPrice = currentPrice
    linkPriceOneDay = oneDayBackPrice
  } catch (e) {
    console.log(e)
  }

  return [linkPrice, linkPriceOneDay, priceChangeLINK]
}

/**
 * Gets the current price  of YFL, 24 hour price, and % change between them
 */
const getYflPrice = async () => {
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix()

  let yflPrice = 0
  let yflPriceOneDay = 0
  let priceChangeYFL = 0

  try {
    let oneDayBlock = await getBlockFromTimestamp(utcOneDayBack)
    let result = await client.query({
      query: YFL_PRICE(),
      fetchPolicy: 'cache-first',
    })
    let resultOneDay = await client.query({
      query: YFL_PRICE(oneDayBlock),
      fetchPolicy: 'cache-first',
    })
    const currentPrice = result?.data?.bundles[0]?.yflPrice
    const oneDayBackPrice = resultOneDay?.data?.bundles[0]?.yflPrice
    priceChangeYFL = getPercentChange(currentPrice, oneDayBackPrice)
    yflPrice = currentPrice
    yflPriceOneDay = oneDayBackPrice
  } catch (e) {
    console.log(e)
  }

  return [yflPrice, yflPriceOneDay, priceChangeYFL]
}

/**
 * Gets the current price  of sYFL, 24 hour price, and % change between them
 */
const getSYflPrice = async () => {
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix()

  let syflPrice = 0
  let syflPriceOneDay = 0
  let priceChangeSYFL = 0

  try {
    let oneDayBlock = await getBlockFromTimestamp(utcOneDayBack)
    let result = await client.query({
      query: SYFL_PRICE(),
      fetchPolicy: 'cache-first',
    })
    let resultOneDay = await client.query({
      query: SYFL_PRICE(oneDayBlock),
      fetchPolicy: 'cache-first',
    })
    const currentPrice = result?.data?.bundles[0]?.syflPrice
    const oneDayBackPrice = resultOneDay?.data?.bundles[0]?.syflPrice
    priceChangeSYFL = getPercentChange(currentPrice, oneDayBackPrice)
    syflPrice = currentPrice
    syflPriceOneDay = oneDayBackPrice
  } catch (e) {
    console.log(e)
  }

  return [syflPrice, syflPriceOneDay, priceChangeSYFL]
}

/**
 * Gets the current price  of YFLUSD, 24 hour price, and % change between them
 */
const getYflusdPrice = async () => {
  const utcCurrentTime = dayjs()
  const utcOneDayBack = utcCurrentTime.subtract(1, 'day').startOf('minute').unix()

  let yflusdPrice = 0
  let yflusdPriceOneDay = 0
  let priceChangeYFLUSD = 0

  try {
    let oneDayBlock = await getBlockFromTimestamp(utcOneDayBack)
    let result = await client.query({
      query: YFLUSD_PRICE(),
      fetchPolicy: 'cache-first',
    })
    let resultOneDay = await client.query({
      query: YFLUSD_PRICE(oneDayBlock),
      fetchPolicy: 'cache-first',
    })
    const currentPrice = result?.data?.bundles[0]?.yflusdPrice
    const oneDayBackPrice = resultOneDay?.data?.bundles[0]?.yflusdPrice
    priceChangeYFLUSD = getPercentChange(currentPrice, oneDayBackPrice)
    yflusdPrice = currentPrice
    yflusdPriceOneDay = oneDayBackPrice
  } catch (e) {
    console.log(e)
  }

  return [yflusdPrice, yflusdPriceOneDay, priceChangeYFLUSD]
}

const PAIRS_TO_FETCH = 500
const TOKENS_TO_FETCH = 500

/**
 * Loop through every pair on varen, used for search
 */
async function getAllPairsOnDarkHorse() {
  try {
    let allFound = false
    let pairs = []
    let skipCount = 0
    while (!allFound) {
      let result = await client.query({
        query: ALL_PAIRS,
        variables: {
          skip: skipCount,
        },
        fetchPolicy: 'cache-first',
      })
      skipCount = skipCount + PAIRS_TO_FETCH
      pairs = pairs.concat(result?.data?.pairs)
      if (result?.data?.pairs.length < PAIRS_TO_FETCH || pairs.length > PAIRS_TO_FETCH) {
        allFound = true
      }
    }
    return pairs
  } catch (e) {
    console.log(e)
  }
}

/**
 * Loop through every token on varen, used for search
 */
async function getAllTokensOnDarkHorse() {
  try {
    let allFound = false
    let skipCount = 0
    let tokens = []
    while (!allFound) {
      let result = await client.query({
        query: ALL_TOKENS,
        variables: {
          skip: skipCount,
        },
        fetchPolicy: 'cache-first',
      })
      tokens = tokens.concat(result?.data?.tokens)
      if (result?.data?.tokens?.length < TOKENS_TO_FETCH || tokens.length > TOKENS_TO_FETCH) {
        allFound = true
      }
      skipCount = skipCount += TOKENS_TO_FETCH
    }
    return tokens
  } catch (e) {
    console.log(e)
  }
}

/**
 * Hook that fetches overview data, plus all tokens and pairs for search
 */
export function useGlobalData() {
  const [state, { update, updateAllPairsInDarkHorse, updateAllTokensInDarkHorse }] = useGlobalDataContext()
  const [ethPrice, oldEthPrice] = useEthPrice()

  const data = state?.globalData

  useEffect(() => {
    async function fetchData() {
      let globalData = await getGlobalData(ethPrice, oldEthPrice)
      globalData && update(globalData)

      let allPairs = await getAllPairsOnDarkHorse()
      updateAllPairsInDarkHorse(allPairs)

      let allTokens = await getAllTokensOnDarkHorse()
      updateAllTokensInDarkHorse(allTokens)
    }
    if (!data && ethPrice && oldEthPrice) {
      fetchData()
    }
  }, [ethPrice, oldEthPrice, update, data, updateAllPairsInDarkHorse, updateAllTokensInDarkHorse])

  return data || {}
}

export function useGlobalChartData() {
  const [state, { updateChart }] = useGlobalDataContext()
  const [oldestDateFetch, setOldestDateFetched] = useState()
  const [activeWindow] = useTimeframe()

  const chartDataDaily = state?.chartData?.daily
  const chartDataWeekly = state?.chartData?.weekly

  /**
   * Keep track of oldest date fetched. Used to
   * limit data fetched until its actually needed.
   * (dont fetch year long stuff unless year option selected)
   */
  useEffect(() => {
    // based on window, get starttime
    let startTime = getTimeframe(activeWindow)

    if ((activeWindow && startTime < oldestDateFetch) || !oldestDateFetch) {
      setOldestDateFetched(startTime)
    }
  }, [activeWindow, oldestDateFetch])

  /**
   * Fetch data if none fetched or older data is needed
   */
  useEffect(() => {
    async function fetchData() {
      // historical stuff for chart
      let [newChartData, newWeeklyData] = await getChartData(oldestDateFetch)
      updateChart(newChartData, newWeeklyData)
    }
    if (oldestDateFetch && !(chartDataDaily && chartDataWeekly)) {
      fetchData()
    }
  }, [chartDataDaily, chartDataWeekly, oldestDateFetch, updateChart])

  return [chartDataDaily, chartDataWeekly]
}

export function useGlobalTransactions() {
  const [state, { updateTransactions }] = useGlobalDataContext()
  const transactions = state?.transactions
  useEffect(() => {
    async function fetchData() {
      if (!transactions) {
        let txns = await getGlobalTransactions()
        updateTransactions(txns)
      }
    }
    fetchData()
  }, [updateTransactions, transactions])
  return transactions
}

export function useEthPrice() {
  const [state, { updateEthPrice }] = useGlobalDataContext()
  const ethPrice = state?.[ETH_PRICE_KEY]
  const ethPriceOld = state?.['ethOneDayPrice']
  useEffect(() => {
    async function checkForEthPrice() {
      if (!ethPrice) {
        let [newPrice, oneDayPrice, priceChange] = await getEthPrice()
        updateEthPrice(newPrice, oneDayPrice, priceChange)
      }
    }
    checkForEthPrice()
  }, [ethPrice, updateEthPrice])

  return [ethPrice, ethPriceOld]
}

export function useLinkPrice() {
  const [state, { updateLinkPrice }] = useGlobalDataContext()
  const linkPrice = state?.[LINK_PRICE_KEY]
  const linkPriceOld = state?.['linkOneDayPrice']
  useEffect(() => {
    async function checkForLinkPrice() {
      if (!linkPrice) {
        let [newPrice, oneDayPrice, priceChange] = await getLinkPrice()
        updateLinkPrice(newPrice, oneDayPrice, priceChange)
      }
    }
    checkForLinkPrice()
  }, [linkPrice, updateLinkPrice])

  return [linkPrice, linkPriceOld]
}

export function useYflPrice() {
  const [state, { updateYflPrice }] = useGlobalDataContext()
  const yflPrice = state?.[YFL_PRICE_KEY]
  const yflPriceOld = state?.['yflOneDayPrice']
  useEffect(() => {
    async function checkForYflPrice() {
      if (!yflPrice) {
        let [newPrice, oneDayPrice, priceChange] = await getYflPrice()
        updateYflPrice(newPrice, oneDayPrice, priceChange)
      }
    }
    checkForYflPrice()
  }, [yflPrice, updateYflPrice])

  return [yflPrice, yflPriceOld]
}

export function useSYflPrice() {
  const [state, { updateSYflPrice }] = useGlobalDataContext()
  const syflPrice = state?.[SYFL_PRICE_KEY]
  const syflPriceOld = state?.['syflOneDayPrice']
  useEffect(() => {
    async function checkForSYflPrice() {
      if (!syflPrice) {
        let [newPrice, oneDayPrice, priceChange] = await getSYflPrice()
        updateSYflPrice(newPrice, oneDayPrice, priceChange)
      }
    }
    checkForSYflPrice()
  }, [syflPrice, updateSYflPrice])

  return [syflPrice, syflPriceOld]
}

export function useYflusdPrice() {
  const [state, { updateYflusdPrice }] = useGlobalDataContext()
  const yflusdPrice = state?.[YFLUSD_PRICE_KEY]
  const yflusdPriceOld = state?.['yflusdOneDayPrice']
  useEffect(() => {
    async function checkForYflusdPrice() {
      if (!yflusdPrice) {
        let [newPrice, oneDayPrice, priceChange] = await getYflusdPrice()
        updateYflusdPrice(newPrice, oneDayPrice, priceChange)
      }
    }
    checkForYflusdPrice()
  }, [yflusdPrice, updateYflusdPrice])

  return [yflusdPrice, yflusdPriceOld]
}

export function useAllPairsInDarkHorse() {
  const [state] = useGlobalDataContext()
  let allPairs = state?.allPairs

  return allPairs || []
}

export function useAllTokensInDarkHorse() {
  const [state] = useGlobalDataContext()
  let allTokens = state?.allTokens

  return allTokens || []
}

/**
 * Get the top liquidity positions based on USD size
 * @TODO Not a perfect lookup needs improvement
 */
export function useTopLps() {
  const [state, { updateTopLps }] = useGlobalDataContext()
  let topLps = state?.topLps

  const allPairs = useAllPairData()

  useEffect(() => {
    async function fetchData() {
      // get top 20 by reserves
      let topPairs = Object.keys(allPairs)
        ?.sort((a, b) => parseFloat(allPairs[a].reserveUSD > allPairs[b].reserveUSD ? -1 : 1))
        ?.slice(0, 99)
        .map((pair) => pair)

      let topLpLists = await Promise.all(
        topPairs.map(async (pair) => {
          // for each one, fetch top LPs
          try {
            const { data: results } = await client.query({
              query: TOP_LPS_PER_PAIRS,
              variables: {
                pair: pair.toString(),
              },
              fetchPolicy: 'cache-first',
            })
            if (results) {
              return results.liquidityPositions
            }
          } catch (e) { }
        })
      )

      // get the top lps from the results formatted
      const topLps = []
      topLpLists
        .filter((i) => !!i) // check for ones not fetched correctly
        .map((list) => {
          return list.map((entry) => {
            const pairData = allPairs[entry.pair.id]
            return topLps.push({
              user: entry.user,
              pairName: pairData.token0.symbol + '-' + pairData.token1.symbol,
              pairAddress: entry.pair.id,
              token0: pairData.token0.id,
              token1: pairData.token1.id,
              usd:
                (parseFloat(entry.liquidityTokenBalance) / parseFloat(pairData.totalSupply)) *
                parseFloat(pairData.reserveUSD),
            })
          })
        })

      const sorted = topLps.sort((a, b) => (a.usd > b.usd ? -1 : 1))
      const shorter = sorted.splice(0, 100)
      updateTopLps(shorter)
    }

    if (!topLps && allPairs && Object.keys(allPairs).length > 0) {
      fetchData()
    }
  })

  return topLps
}
