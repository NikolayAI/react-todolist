import { appReducer, setAppStatus, setAppError, RequestStatusType } from './appReducer'

let startState: {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false,
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError('some error'))

    expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus('loading'))

    expect(endState.status).toBe('loading')
})
