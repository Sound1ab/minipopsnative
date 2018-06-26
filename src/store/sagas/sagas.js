import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'
import { addToFavourites, FETCH_DATA, fetchDataAsync } from '../actions/actions'

export const API = 'https://swapi.co/api/people/'

export function* incrementAsync() {
  try {
    const data = yield call(fetchDataAsync, API)
    yield put(addToFavourites(data.results))
  } catch (error) {
    yield put({ type: 'ERROR' })
  }
}

function* watchIncrementAsync() {
  yield takeEvery(FETCH_DATA, incrementAsync)
}

export default function* rootSaga() {
  yield all([watchIncrementAsync()])
}
