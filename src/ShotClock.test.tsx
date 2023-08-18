import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import ShotClock from './ShotClock'

let resetButton: Node | Window
let toggleButton: Node | Window
const STOP = 'Stop'
const START = 'Start'

const advanceJestTimersByTime = (increment: number) => {
    act(() => {
        jest.advanceTimersByTime(increment)
    })
}

beforeEach(() => {
    jest.useFakeTimers()

    render(<ShotClock />)
    resetButton = screen.getByTestId('reset')
    toggleButton = screen.getByTestId('toggle')
})

describe('<ShotClock />', () => {
    describe('resetButton', () => {
        test('should reset seconds to 24', async () => {
            advanceJestTimersByTime(1000)

            await waitFor(() => {
                expect(screen.queryByText('24')).toBeNull()
                expect(screen.queryByText('23')).toBeDefined()

                fireEvent.click(resetButton)

                expect(screen.queryByText('24')).toBeDefined()
                expect(screen.queryByText('23')).toBeNull()
            })
        })
    })

    describe('toggleButton', () => {
        test('text value should be Stop', () => {
            expect(screen.getByText(STOP)).toBeDefined()
            expect(screen.queryByText(START)).toBeNull()
        })

        describe('onClick', () => {
            test('text value should be Start', () => {
                fireEvent.click(toggleButton)
                expect(screen.getByText(START)).toBeDefined()
                expect(screen.queryByText(STOP)).toBeNull()
            })
        })
    })
})