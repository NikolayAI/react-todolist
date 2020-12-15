import { appReducer, InitialStateType, appActions } from './appReducer'

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false,
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, appActions.setAppError('some error'))

    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, appActions.setAppStatus('loading'))

    expect(endState.status).toBe('loading')
})
